//
// Created by Yi Yang on 6/28/2022.
//
/**
 * This is a wrapper around a modified version of the scrypt implementation
 * see : https://github.com/derivepass/scrypt
 * */
#ifndef C20_CC20_SCRYPT_H
#define C20_CC20_SCRYPT_H

#include <cstdint>
#include <stdio.h>
#include <string.h>
#include <iostream>
#include "scrypt.h"
//#include "cc20_dev.hpp"

using std::cout;
using std::endl;
struct scrypt_block_mix_test_s {
  unsigned int r;
  uint8_t input[128];
  uint8_t expected[128];
};

struct scrypt_ro_mix_test_s {
  unsigned int r;
  unsigned int n;
  uint8_t input[128];
  uint8_t expected[128];
};

struct scrypt_scrypt_test_s {
  const char* passphrase;
  const char* salt;

  unsigned int r;
  unsigned int n;
  unsigned int p;

  uint8_t expected[64];
};

typedef struct scrypt_block_mix_test_s scrypt_block_mix_test_t;
typedef struct scrypt_ro_mix_test_s scrypt_ro_mix_test_t;
typedef struct scrypt_scrypt_test_s scrypt_scrypt_test_t;

class c20_scrypt{
public:

  void test(){
    scrypt_scrypt_test_s tests[]={
      {
        .passphrase = "password",
        .salt = "NaCl",
        .r = 8,
        .n = 1024,
        .p = 1,
        .expected = {
            0xfd, 0xba, 0xbe, 0x1c, 0x9d, 0x34, 0x72, 0x00,
            0x78, 0x56, 0xe7, 0x19, 0x0d, 0x01, 0xe9, 0xfe,
            0x7c, 0x6a, 0xd7, 0xcb, 0xc8, 0x23, 0x78, 0x30,
            0xe7, 0x73, 0x76, 0x63, 0x4b, 0x37, 0x31, 0x62,
            0x2e, 0xaf, 0x30, 0xd9, 0x2e, 0x22, 0xa3, 0x88,
            0x6f, 0xf1, 0x09, 0x27, 0x9d, 0x98, 0x30, 0xda,
            0xc7, 0x27, 0xaf, 0xb9, 0x4a, 0x83, 0xee, 0x6d,
            0x83, 0x60, 0xcb, 0xdf, 0xa2, 0xcc, 0x06, 0x40
        }
      }
    };
    scrypt_scrypt_test_s* v;
    scrypt_state_t state;
    uint8_t out[sizeof(v->expected)];
    size_t j;

    v = &tests[0];

    state.n = v->n;
    state.r = v->r;
    state.p = v->p;
    scrypt_state_init(&state);

    scrypt(&state,
           (const uint8_t*) v->passphrase,
           strlen(v->passphrase),
           (const uint8_t*) v->salt,
           strlen(v->salt),
           out,
           sizeof(out));
    // PDM tests
//    cout<<"==scrypt test=="<<endl;
//    p_hex((uint8_t*)out,(size_t) 32);
//    cout<<"===="<<endl;
    scrypt_state_destroy(&state);
  }
  void make_ps(const uint8_t* inps, uint8_t* outps ){
    scrypt_scrypt_test_s tests[]={
        {
            .passphrase = (const char*) inps,
            .salt = "NaCl",
            .r = 8,
            .n = 1024,
            .p = 1
        }
    };
    scrypt_scrypt_test_s* v;
    scrypt_state_t state;
//    uint8_t out[32];
    size_t j;

    v = &tests[0];

    state.n = v->n;
    state.r = v->r;
    state.p = v->p;
    scrypt_state_init(&state);

    scrypt(&state,
           (const uint8_t*) v->passphrase,
           strlen(v->passphrase),
           (const uint8_t*) v->salt,
           strlen(v->salt),
           outps,
           32);

//    memcpy(outps,out,32);
    // PDM tests
//    cout<<"==scrypt test=="<<endl;
//    cout<<"=="<<outps<<"=="<<endl;
//    cout<<"===="<<endl;
    scrypt_state_destroy(&state);
  }
};
#endif //C20_CC20_SCRYPT_H
