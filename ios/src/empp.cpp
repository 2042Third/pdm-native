/**
 * This is a wrapper around the cc20 encryption library for WebAssembly and Emscripten.
 * However, this still uses c++'s std::string.  
 * 
 * Yi Yang
 * */
#ifndef EMPP_CPP
#define EMPP_CPP
#include <stdio.h>
#include <string>
#include <memory>
#include <vector>
#include "cc20_multi.h"
#include "ec.h"
#include "empp.h"
#include "sha3.h"
#include "cc20_scrypt.h"
#include <iostream>
#include <string.h>
#include <sstream>
#include <stdlib.h>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
#endif
using namespace std;


void memclear(uint8_t* a, size_t b ){
  for (size_t i=0; i<b;i++){
    a[i] = 0;
  }
}
/**
 * @param a user1
 * @param b user2
 * 
 * */
string pp_hash(std::string user1, std::string user2){
  std::cout<<std::flush;//flush
  string c = user1.size()>user2.size()?user1:user2;
  string d = user1.size()>user2.size()?user2:user1;
  vector<char> buf(c.begin(),c.end()); 
  for (size_t i=0; i<d.size(); i++){
    buf[i] =(uint8_t)buf[i] +(uint8_t)d[i];
  }
  SHA3 vh;
  vh.add(buf.data(),buf.size());
  std::cout<<std::flush;//flush
  return vh.getHash();
}
/**
 * wrapper for calling from c
 * 
 * */
const char* pp_hash_c(char* user1, char* user2){
  std::string u1 = std::string(user1);
  std::string u2 = std::string(user2);
  std::string out = pp_hash(u1, u2);
  return out.data();
}

void pp_hash_convert(const char* user1, const char* user2, char* outstr){
  std::string u1 = std::string(user1);
  std::string u2 = std::string(user2);
  std::string out = pp_hash(u1, u2);
  for(unsigned int i=0; i<out.size();i++){
    outstr[i] = out[i];
  }
}



// EMSCRIPTEN_KEEPALIVE
void use_vector_string(const std::vector<uint8_t> &vec) {
    std::cout << "size() = " << vec.size() << ", capacity()=" << vec.capacity() << "\n";
    for (const auto &str : vec) {
        std::cout << "vec[]=|" << str << "|\n";
    }
}


string loader_check(const std::string key, const std::string input)
{
  string buf(input);    //= new vector<uint8_t>();
  string outstr(input.size() + (NONCE_SIZE+POLY_SIZE),0); // = new vector<uint8_t>();
//  cout<<"entering cmd_enc((uint8_t *)((&buf)->data()), (size_t)input.size(), (uint8_t *)((&outstr)->data()), key)"<<endl;
  cmd_enc((uint8_t *)((&buf)->data()), (size_t)input.size(), (uint8_t *)((&outstr)->data()), key);
//  cout<<"existing cmd_enc((uint8_t *)((&buf)->data()), (size_t)input.size(), (uint8_t *)((&outstr)->data()), key)"<<endl;
  return stoh( outstr);
}

/**
 * @requires outstr must have input_n+28 bytes.
 * */
void loader_check_convert(const char* key,  const char* input, size_t input_n, char* outstr){
  string str_key(key);
  string outstring(input_n + (NONCE_SIZE+POLY_SIZE),0); // = new vector<uint8_t>();
  cmd_enc((uint8_t *)(input), (size_t)input_n, (uint8_t *)((&outstring)->data()), str_key);
  string none_tmp=stoh( outstring);
  cout<<"encrypted hax size: "<<none_tmp.size()<<endl;
  memcpy(outstr,(uint8_t *)((&none_tmp)->data()), none_tmp.size());
}

string loader_out(const std::string key, const std::string inputi)
{
  string buf(htos(inputi));    //= new vector<uint8_t>();
  string outstr((buf.size()) - (NONCE_SIZE+POLY_SIZE),0);    //= new vector<uint8_t>();
  size_t inpsize = (buf.size()) ;
//  cout<<"entering cmd_dec((uint8_t *)((&buf)->data()), inpsize, (uint8_t *)((&outstr)->data()), key)"<<endl;
  cmd_dec((uint8_t *)((&buf)->data()), inpsize, (uint8_t *)((&outstr)->data()), key);
//  cout<<"existing cmd_dec((uint8_t *)((&buf)->data()), inpsize, (uint8_t *)((&outstr)->data()), key)"<<endl;
  return outstr;
}

C20_EXPORT 
void loader_out_convert(const char* key,  const char* inputi, size_t inputi_n, char* outstr)
{
  string str_key(key);
  string bufbuf(inputi);
  string buf(htos(bufbuf));    //= new vector<uint8_t>();
  cout<<"decryption start: "<<buf.size()<<endl;
  string outstring((buf.size()) - (NONCE_SIZE+POLY_SIZE),0);
  size_t inpsize = (buf.size()) ;
  cout<<"decryption size: "<<buf.size()<<endl;
  cmd_dec((uint8_t *)((&buf)->data()), inpsize, (uint8_t *)((&outstring)->data()), str_key);
  memcpy(outstr,(char *)((&outstring)->data()), outstring.size());
  return ;
}

/**
 * Return the secret key
 * 
 * */
string gen_sec(){
  uint8_t sec[C20_ECC_SIZE+1];
  sec[C20_ECC_SIZE]='\0';
  string tmpsec="";
  ECC20 ecc;
  ecc.gensec((uint8_t*)sec);
  for(size_t i=0;i<C20_ECC_SIZE;i++)
    tmpsec.append(1,(char)sec[i]);
  // #ifdef WEB_TEST
  // printf("gen_sec(): \"%s\"\n",sec);
  // #endif 
  return stoh(tmpsec);
}
/**
 * Return the public key
 * @param - a the secret key
 * */
string gen_pub(string a){
  uint8_t pub[33];
  pub[C20_ECC_SIZE]='\0';
  string tmpsec=htos(a);
  // #ifdef WEB_TEST
  // printf("gen_pub input: \"%s\"\n",tmpsec.data());
  // #endif 
  ECC20 ecc;
  ecc.setsec((uint8_t*)tmpsec.data());
  ecc.genpub(pub);
  string tmppub="";
  for(size_t i=0;i<C20_ECC_SIZE;i++)
    tmppub.append(1,(char)pub[i]);
  return stoh(tmppub);
}

/**
 * Return the shared key
 * @param - a the secret key
 * @param - c the other public key
 * */
string gen_shr(string a,  string c){
  uint8_t shr[C20_ECC_SIZE+1];
  shr[C20_ECC_SIZE]='\0';
  string tmpsec=htos(a);
  string tmp2pub=htos(c);
  ECC20 ecc;
  ecc.setsec((uint8_t*)tmpsec.data());
  ecc.genshr(shr,(uint8_t*)tmp2pub.data());
  string tmpshr="";
  for(int i=0;i<C20_ECC_SIZE;i++)
    tmpshr.append(1,(char)shr[i]);
  // #ifdef WEB_TEST
  // printf("gen_shr(a,c): \"%s\"\n",stoh(tmpshr).data());
  // #endif 
  return stoh(tmpshr);
}

string get_hash(string a){
  SHA3 vh;
  vh.add(a.data(),a.size());
  string b = vh.getHash();
  return b;
}

string scrypt(string a){
  c20_scrypt k;
  string key_hash_str(32,0);
  k.make_ps((const uint8_t *)a.data(), (uint8_t *)(key_hash_str.data()));
  return stoh(key_hash_str);
}

void get_hash_convert(const char* a, size_t a_n, char* outstr){
  SHA3 vh;
  vh.add(a,a_n);
  string b = vh.getHash();
  for(unsigned int i=0; i<b.size();i++){
    outstr[i] = b[i];
  }
}
namespace web_test{
  /**
   * Basic encryption and decryption demo
   * @param a key for encryption
   * @param b message to be encrypted
   * @param accum for r_test() only, default -1
   * */
  int test (const string& a, const string& b, int accum=-1){
    string enc = loader_check(a, b);
    string dec = loader_out(a, enc);
    string decWrong = loader_out("12345",enc);
    int ttl = 1000000;
    if(accum==-1){
      cout<<"Input key: \t"<<a<<endl;
      cout<<"Input message: \t"<<b<<endl;
      cout<<"Encrypted message: \t"<<enc<<endl;
      cout<<"Decrypted message: \t"<<dec<<endl;
      cout<<"\"12345\" Decrypted message: \t"<<decWrong<<endl;
      return 1;
    }
    if (dec == b){
      accum+=1;
      cout<<accum/10000<< "% pass\r";
    }
    else {
      cout<<"failure!!"<<endl;
      cout<< "\tgot     : "<<dec<<endl;
      cout<< "\texpected: "<<b<<endl;
    }
    return accum;
  }
  /**
   * Runs the encryption and decryption for 1,000,000 times
   * and count the accuracy.
   * *Not useful after the initial implementation.
   * */
  int r_test(int count){
    char* pas = "1234";
    char* tmp2 = "hello this is a message";
    int accum =0;
    for (unsigned int i=0 ; i< count;i++){
      accum = test(pas, tmp2, accum);
    }
    cout<<endl;
    return 1;
  }
  /**
   * Basic public key DH test
   * */
  int curve_test (){
     size_t testsize=0;
     uint8_t test[C20_ECC_SIZE];
     string ttmp="3a57718b1da04cc0c52f626212e5c82a";
     for(auto i:ttmp){
       test[testsize]=i;
       testsize++;
     }
     string tmpshr="";
     for(int i=0;i<C20_ECC_SIZE;i++)
       tmpshr.append(1,(char)test[i]);
     // cout<<test<<endl;
     // cout<<stoh(tmpshr)<<endl;

     // Alice
     string seca = gen_sec();
     string puba = gen_pub(seca);

     // Bob
     string secb = gen_sec();
     string pubb = gen_pub(secb);

     //agreenent
     string shra = gen_shr(seca,pubb);
     string shrb = gen_shr(secb,puba);
     printf("Alice secret and public: \"%s\", \"%s\"\n",seca.data(),puba.data());
     printf("Bob   secret and public: \"%s\", \"%s\"\n",secb.data(),pubb.data());
     printf("Alice shared: \"%s\"\n",shra.data());
     printf("Bob   shared: \"%s\"\n",shrb.data());
     return 1;
  }


} // namespace testing

#ifdef cplusplus_main_compilation

int main2(int argc, char **argv)
{


  return 0;
}
#endif //END_TEST

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(raw_pointers) {
  emscripten::register_vector<uint8_t>("CharList");
  emscripten::function("loader_check", &loader_check);
  emscripten::function("loader_out", &loader_out);
  emscripten::function("get_hash",&get_hash);
  emscripten::function("pp_hash",&pp_hash);
  emscripten::function("gen_sec",&gen_sec);
  emscripten::function("gen_pub",&gen_pub);
  emscripten::function("gen_shr",&gen_shr);
}
#endif


#endif //EMPP_CPP