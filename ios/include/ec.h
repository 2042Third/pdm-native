/*
ec.h

Public key diffie-hellman using curve 25519.

Curve implementation from public domain.

author:     Yi Yang
            2/2022
*/
#ifndef _EC_H_
#define _EC_H_

#define C20_ECDH_CURVE_25519_SIZE 32

class ECC20{
public:
  // Generate a secret key
  void gensec();
  void gensec(uint8_t*b);
  // Create a secret key 
  void gensecfrom(const uint8_t *a);
  void gensecfrom(uint8_t*b,const uint8_t *a);

  // Generate public key
  void genpub();
  void genpub(uint8_t*a);
  void getpub(uint8_t*a);

  // Generate shared secret
  void genshr(const uint8_t* pub2);
  void genshr(uint8_t*a,const uint8_t* pub2);
  // Get shared
  void getshr(uint8_t* a);

  // Sets the secret key
  void setsec(const uint8_t*a);
  // Sets the public key
  void setpub(const uint8_t*a);
private:
  void init_byte_rand_cc20 (uint8_t* a, size_t n);
  uint8_t sec[33];
  uint8_t rsec[33];
  uint8_t pub[33];
  uint8_t shr[33]; 
};

#endif // _EC_H_