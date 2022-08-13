/*
cc20_dev.cpp

pdm/Personal Data Management system is a encrypted and multiplatform data searching, building, archiving tool.

author:     Yi Yang
            5/2021
*/

// #include "pdm-service.hpp"
#include <iostream>
#include <climits>
#include <ostream>
#include <iterator>
#include <random>
#include <wchar.h>

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
#include <locale.h>
#include <windows.h>
#define _MBCS
#include <io.h>
#include <fcntl.h>

#endif

using namespace std;
unsigned int i=0;


void stream(uint8_t * key, uint8_t * nonce, uint32_t count,uint8_t*plain,unsigned int len);


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
  for (i=0; i<16;i++){
    U32T8_S(a+4*i,b[i]);

  }
}

void expan(uint32_t * ot, unsigned int off, const uint8_t* in, unsigned int n) {
  for(i=0;i<n;i++){
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
    for(i=0; i<16;i++){
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
void init_byte_rand_cc20 (Bytes & a, int n){
    for (int i=0;i<n;i++) {
        random_device rd;   // non-deterministic generator
        mt19937 gen(rd());
        a.push_back((uint8_t) gen());
    }
} 
/**
 * Requires length of a >= n
 * 
 * */
void init_byte_rand_cc20 (uint8_t* a, int n){
    for (int i=0;i<n;i++) {
        random_device rd;   // non-deterministic generator
        mt19937 gen(rd());
        a[i]=(uint8_t) gen();
    }
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




