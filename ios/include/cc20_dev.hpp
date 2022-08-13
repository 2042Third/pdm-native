/*
cc20_dev.hpp

pdm/Personal Data Management system is a encrypted and multiplatform data searching, building, archiving tool.

author:     Yi Yang
            5/2021
*/

#ifndef PDM_CC20_DEV_HPP
#define PDM_CC20_DEV_HPP 

// #include "pdm-service.hpp"
#include <iostream>
#include <climits>
#include <ostream>
#include <iterator>
#include <random>
#include <wchar.h>
#include <fstream>

// Types
#include "types.h"

#ifdef DEEP_DEBUG
#include <iomanip>
#include <iostream>
#endif

#ifdef MACOS
#include <unistd.h>
#include <termios.h>
#endif

#ifdef LINUX
#include <unistd.h>
#ifndef WINDOWS
// #include <termios.h>
#endif 
#endif

#ifdef WINDOWS
#ifndef WEB_RELEASE
#include <locale.h>
#include <windows.h>
#define _MBCS
#include <io.h>
#include <fcntl.h>
#endif // WEB_RELEASE
#endif // WINDOWS

using namespace std;
// unsigned int i=0;

// Types
template<typename T, int N> using raw_array = T[N];


// Constants
const int MAX_KEY_LENGTH = 32;

// void stream(uint8_t * key, uint8_t * nonce, uint32_t count,uint8_t*plain,unsigned int len);

// Addition operation
template<typename NU>
void set_conc(NU* s1,NU* s2,unsigned int n){
    for(unsigned int i=0;i<n;i++)s1[i]+=s2[i];
}

// XOR operation
template<typename NU>
void set_xor(NU* s1,NU* s2,unsigned int n,unsigned int off){
    for(unsigned int i=0;i<n;i++){
        s1[i+off]=s1[i+off]^s2[i];
    }
}

// Convert c++ string into Bytes type

Bytes stob (std::string &src){
    Bytes vec(src.begin(), src.end());
    return vec;
}

template<typename TYP>
void stb (TYP* ot,std::string &src){
    std::copy(src.begin(),src.end(),ot); 
}

template<typename TYP>
std::string bts (TYP*inp){
    std::string ot = (char*)inp;
    return ot;
}


std::string bts(uint8_t *inp,unsigned int n){
    std::vector<char> otvec;
    for(unsigned int i=0;i<n;i++) otvec.push_back(inp[i]);
    std::string ot(otvec.begin(),otvec.end());
    return ot;
}

/**
 * Also copies exists in stand_alone.cpp
 * */
std::string btos (Bytes &src){
    std::string str(src.begin(), src.end());
    return str;
}
/**
 * Also copies exists in stand_alone.cpp
 * */
void init_byte_rand_cc20 (Bytes & a, int n){
  for (int i=0;i<n;i++) {
    std::random_device rd;   // non-deterministic generator
    std::mt19937 gen(rd());
    a.push_back((uint8_t) gen());
  }
}
std::string pad_to_key (const std::string& text_key, const int len){
#ifdef VERBOSE
  cout<<"pad to key length: "<<text_key.size()<<endl;
#endif
  std::string key;
  key = std::string((len - text_key.size()), '0');
  key = key+text_key;
  return key;
}

#define U32T8_S(p, v)    \
  {                            \
    (p)[0] = (v >> 0) & 0xff;  \
    (p)[1] = (v >> 8) & 0xff;  \
    (p)[2] = (v >> 16) & 0xff; \
    (p)[3] = (v >> 24) & 0xff; \
  }

#define U8T32_S(p)                              \
  (((uint32_t)((p)[0])) | ((uint32_t)((p)[1]) << 8) | \
   ((uint32_t)((p)[2]) << 16) | ((uint32_t)((p)[3]) << 24))

// INT should only be unsigned, no checks here.
template <typename NT> 
void roln(NT &val,unsigned int n) {
    val= (val << n) | (val >> (32-n));
}

template <> 
void roln<uint32_t>(uint32_t &val,unsigned int n) {
    val= (val << n) | (val >> (32-n));
}

template <typename Iterator>
struct hex_iterator_traits {
    typedef typename std::iterator_traits<Iterator>::value_type value_type;
};

template<typename Container>
struct hex_iterator_traits< std::back_insert_iterator<Container> > {
    typedef typename Container::value_type value_type;
};

template<typename Container>
struct hex_iterator_traits< std::front_insert_iterator<Container> > {
    typedef typename Container::value_type value_type;
};

template<typename Container>
struct hex_iterator_traits< std::insert_iterator<Container> > {
    typedef typename Container::value_type value_type;
};

template<typename T, typename charType, typename traits>
    struct hex_iterator_traits< std::ostream_iterator<T, charType, traits> > {
        typedef T value_type;
    };

//algo change #2
static inline uint32_t rotl32(uint32_t x, int n)
{
  // http://blog.regehr.org/archives/1063
  return x << n | (x >> (-n & 31));
}

void endicha(uint8_t *a, uint32_t *b){
  for (unsigned int i=0; i<16;i++){
    U32T8_S(a+4*i,b[i]);

  }
}

uint32_t upper(uint64_t a){
  uint32_t b;
  a&= 0xffffffff00000000ull;
  b=a>>32;
  return b;
}
uint32_t lower(uint64_t a){
  uint32_t b;
  a&= 0x00000000ffffffffull;
  a=a<<32;
  b=a>>32;
  return (uint32_t)b;
}
void expan(uint32_t * ot, unsigned int off, const uint8_t* in, unsigned int n) {
  for(unsigned int i=0;i<n;i++){
    ot[off+i] = U8T32_S(in+4*i);
  }
}

// Operate a quarter-round chacha state on total of 16 bytes or 4 32-bit numbers at a time.
void quarteround(uint32_t * x, uint32_t a, uint32_t b, uint32_t c, uint32_t d){

  x[a] += x[b];
  x[d] = rotl32(x[d] ^ x[a], 16);
  x[c] += x[d];
  x[b] = rotl32(x[b] ^ x[c], 12);
  x[a] += x[b];
  x[d] = rotl32(x[d] ^ x[a], 8);
  x[c] += x[d];
  x[b] = rotl32(x[b] ^ x[c], 7);
}

void tworounds(uint32_t * state){
    quarteround(state, 0, 4, 8, 12) ;
    quarteround(state, 1, 5, 9, 13) ;
    quarteround(state, 2, 6, 10, 14);
    quarteround(state, 3, 7, 11, 15);
    quarteround(state, 0, 5, 10, 15);
    quarteround(state, 1, 6, 11, 12);
    quarteround(state, 2, 7, 8, 13) ;
    quarteround(state, 3, 4, 9, 14) ;
}
#ifdef PRINTING
// Print a hex unsigned number
template <typename NT> 
void p_hex (NT i){
    cout<<" 0x";cout<<setfill('0')<<setw(8)<<hex<<right<<i<<flush;

}
template <> 
void p_hex<uint8_t> (uint8_t i){
    cout<<dec<<i<<flush;
}

// Print a chacha state
template <typename NT> 
void p_state (NT * state){
    for(unsigned int i=0; i<16;i++){
        p_hex(state[i]);
        if((i+1)%4==0)cout<<"\n";
    }
    cout<<endl;
}
template <>
void p_state<uint8_t> (uint8_t * state){
  int n=16;
  for(unsigned int i=0; i<64;i++){
    // if((i+1)%n==0)cout<<setw(1)<<right<<"\t";
    p_hex(state[i]);
    if((i+1)%n==0)cout<<"\n";
  }
  cout<<endl;
}

void p_hex (const uint8_t * state,size_t size){
  int n=4;
  if(size%4!=0){
    cout<<"Hex cannot be print, length error."<<endl;
  }
  for(unsigned int i=0; i<size/4;i++){
    // if((i+1)%n==0)cout<<setw(1)<<right<<"\t";
    p_hex(U8T32_S(state+4*i));
    cout<<"\n";
  }
  cout<<endl;
}
#endif

template<typename NT>
void state_cpy(NT *a,NT*b,unsigned int n){
    for(unsigned int i=0; i<n;i++) a[i]=b[i];
}
template <typename T, typename OutputIterator>
    OutputIterator encode_one ( T val, OutputIterator out, const char * hexDigits ) {
        const std::size_t num_hex_digits =  2 * sizeof ( T );
        char res [ num_hex_digits ];
        char  *p = res + num_hex_digits;
        for ( std::size_t i = 0; i < num_hex_digits; ++i, val >>= 4 )
            *--p = hexDigits [ val & 0x0F ];
        return std::copy ( res, res + num_hex_digits, out );
        }

template <typename T>
unsigned char hex_char_to_int ( T val ) {
    char c = static_cast<char> ( val );
    unsigned retval = 0;
    if      ( c >= '0' && c <= '9' ) retval = c - '0';
    else if ( c >= 'A' && c <= 'F' ) retval = c - 'A' + 10;
    else if ( c >= 'a' && c <= 'f' ) retval = c - 'a' + 10;
    return static_cast<char>(retval);
    }

/**
 * Based on boost and sql functions that converts hex string to string
 * 
 * */
template<typename InputIter, typename OutIter >
OutIter decode_one( InputIter &a1, InputIter a2 , OutIter out ){
    typedef typename hex_iterator_traits<OutIter>::value_type T;
    T res (0);
    for ( std::size_t i = 0; i < 2 * sizeof ( T ); ++i, ++a1 ) {
        res = ( 16 * res ) + hex_char_to_int (*a1);
    }

        *out = res;
        return ++out;
}


/**
 * Based on boost and sql functions that converts hex string to string
 * 
 * */
template<typename InputIter, typename OutIter >
OutIter htos_( InputIter a1, InputIter a2 , OutIter out ){
    while ( a1 != a2 )
        out = decode_one ( a1, a2, out);
    return out;
}
/**
 * Based on boost and sql functions that converts hex string to string
 * 
 * */
template<typename OutIter >
OutIter htos_to(const string &a, OutIter out ){
    return htos_(a.begin(), a.end(), out);
}

/**
 * Based on boost and sql functions that converts hex string to string
 * 
 * */
template<typename InputIter, typename OutIter >
OutIter hex_f( InputIter a1, InputIter a2 , OutIter out ){
    for ( ; a1 != a2; ++a1 )
        out = encode_one ( *a1, out, "0123456789abcdef" );
    return out;
}
/**
 * Based on boost and sql functions that converts hex string to string
 * 
 * */
template<typename OutIter >
OutIter hex_from(const string &a, OutIter out ){
    return hex_f(a.begin(), a.end(), out);
}


void init_byte (Bytes & a, int n){
    for (int i=0;i<n;i++) a.push_back((uint8_t) 0);
}


void filterin(unsigned char * r){
    r[3] &= 15;
    r[7] &= 15;
    r[11] &= 15;
    r[15] &= 15;
    r[4] &= 252;
    r[8] &= 252;
    r[12] &= 252;
}


#endif // PDM_CC20_DEV_HPP