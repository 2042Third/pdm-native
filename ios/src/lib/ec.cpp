/*
ec.cpp

Public key diffie-hellman using curve 25519.

Curve implementation from public domain.

author:     Yi Yang
            2/2022
*/

#include <stdio.h>
#include <string.h>
#include <random>
#include "ecc/ecdh_curve25519.h"
#include "ec.h"

// #include <iostream>

/**
 * Requires length of a >= n
 * 
 * */
void ECC20::init_byte_rand_cc20 (uint8_t* a, size_t n){
    for (size_t i=0;i<n;i++) {
        std::random_device rd;   // non-deterministic generator
        std::mt19937 gen(rd());
        a[i]=(uint8_t) gen();
        // std::cout<<a[i]<<"-"<<i;
    }
    // std::cout<<std::endl;
} 
// Generate a secret key
void ECC20::gensec(){
  init_byte_rand_cc20(sec,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
  ecdh_curve25519_secret_key(rsec, sec);
}

void ECC20::gensec(uint8_t b[C20_ECDH_CURVE_25519_SIZE]){
  init_byte_rand_cc20(sec,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
  ecdh_curve25519_secret_key(rsec, sec);
  // std::cout<<"hello: "<<rsec<<std::endl;
  memcpy(b,rsec,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}

// Create a secret key 
void ECC20::gensecfrom(const uint8_t *a){
  memcpy(sec,a,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
  ecdh_curve25519_secret_key(rsec, sec);
}
// Create a secret key 
void ECC20::gensecfrom(uint8_t* b,const uint8_t *a){
  memcpy(sec,a,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
  ecdh_curve25519_secret_key(rsec, sec);
  memcpy(b,rsec,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}

// Generate public key
void ECC20::genpub(){
  ecdh_curve25519_public_key(pub,rsec);
}

// Generate public key
void ECC20::genpub(uint8_t a[C20_ECDH_CURVE_25519_SIZE]){
  ecdh_curve25519_public_key(pub,rsec);
  memcpy(a,pub,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}

void ECC20::getpub(uint8_t a[C20_ECDH_CURVE_25519_SIZE]){
  memcpy(a,pub,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}

void ECC20::genshr(const uint8_t* pub2){
  ecdh_curve25519_shared_secret(shr, rsec, pub2);
}

// Generate shared secret
void ECC20::genshr(uint8_t a[C20_ECDH_CURVE_25519_SIZE],const uint8_t pub2[C20_ECDH_CURVE_25519_SIZE]){
  ecdh_curve25519_shared_secret(shr, rsec, pub2);
  memcpy(a,shr,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}

// Get shared
void ECC20::getshr(uint8_t a[C20_ECDH_CURVE_25519_SIZE]){
  memcpy(a,shr,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}


// Sets the secret key
void ECC20::setsec(const uint8_t a[C20_ECDH_CURVE_25519_SIZE]){
  memcpy(rsec, a,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}
// Sets the public key
void ECC20::setpub(const uint8_t a[C20_ECDH_CURVE_25519_SIZE]){
  memcpy(pub, a,sizeof(uint8_t)*C20_ECDH_CURVE_25519_SIZE);
}