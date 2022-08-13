//
// Created by Yi Yang on 6/26/2022.
//
#include "types.h"
#include "cc20_multi.h"
#include "empp.cpp"
// KDF test
#include "cc20_scrypt.h"

#ifndef PDM_CC20_DEV_HPP
#include "lib/stand_alone.cpp"
#endif // PDM_CC20_DEV_HPP
using namespace std;

//#ifdef HAS_MAIN
void set_config(char*inp, c20::config * sts){
  string a = inp;
  for(unsigned int i=0;i<a.size();i++){
    if      (a[i] == 'S' ) sts->ENABLE_SHA3_OUTPUT = 1;
    else if (a[i] == 'H' ) sts->DISPLAY_PROG = 0;
    else if (a[i] == 'd' ) sts->poly1305_toggle = 0;
    else if (a[i] == 'E' ) sts->DE = 0;
    else if (a[i] == 'D' ) sts->DE = 1;
    else if (a[i] == 'h'){
      printf("Usage: %s\nOptions:\n-d\t%s\n-S\t%s\n-H\t%s\n-E\t%s\n-D\t%s\n-h\t%s\n%s\n",
             "c20 [OPTIONS] FILE_NAME",
             "Fast mode, disable poly1305 checking",
             "Enable sha3 output on plain text",
             "Hide progress bar",
             "Encrypt(default)",
             "Decrypt",
             "Help menu (current)",
             "Personal Data Manager Encryption Module\nWarning: This program overwrittes files with .pdm extension, make sure you are not overwritting unintended files by mistake! \nby Yi Yang, 2021");
      exit(0);
    }
    else if (a[i]!='-') {
      printf("Unrecognized option \"%c\", -h for help",a[i]);
    }
  }
}
c20::config rd_inp(unsigned int argc, char ** argv, string *infile){
  c20::config sts;
  for (unsigned int i = 1; i< argc;i++){
    if (argv[i][0] == '-'){
      set_config(argv[i], &sts);
    }
    else{
      if (infile->empty()){
        sts.arg_c++;
        *infile = argv[i];
      }
      else
        return sts;
    }
  }

  return sts;
}
int main(int argc, char ** argv) {
#ifndef WEB_RELEASE_LINUX_TEST
  string infile,oufile,nonce;
  c20::config configs = rd_inp(argc,argv,&infile);
  if (configs.arg_c!=2){
    cout<<"Must have 1 file input, -h for help."<<endl;
    return 0;
  }
  cmd_enc(infile,"", configs);
#else // start linux web test
  if(argc < 2){
    cout<<"Must have 1 input to start testing. \n \"1\" for curve test. \n "
          "\"2\" for encryption test. "
          "\"3\" for scrypt test. \n "<<endl;
    return 0;
  }
  if(stoi(argv[1]) == 1){
    cout<<"Curve test for web release.\n"<<endl;
    web_test::curve_test();
  }
  else if (stoi(argv[1]) == 2){
    cout<<"Encryption test for web release.\n"<<endl;

    std::string pas = "1234";
    std::string msg = "hello this is a message";
    web_test::test(pas, msg);
  }
  else if (stoi(argv[1]) == 3){
    cout<<"Scrypt Test.\n"<<endl;

    std::string pas = "1234";
    std::string msg = "hello this is a messagehello this is a messagehello this is a message";
    string out1 = scrypt(pas);
    string out2 = scrypt(msg);

    cout<<"#1: \""<< pas<<"\"\n"<<endl;
    cout<<"#1 out: \""<< out1<<"\"\n"<<endl;
    cout<<"#2: \""<< msg<<"\"\n"<<endl;
    cout<<"#2 out: \""<< out2<<"\"\n"<<endl;
  }
  else {
   cout<<"Command not found, exiting."<<endl;
  }
#endif
  return 0;
}
//#endif // HAS_MAIN