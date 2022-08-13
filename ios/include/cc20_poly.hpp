#pragma once

#include "poly1305-donna.h"

class cc20_poly {
public:
  void init(unsigned char *key){
    poly1305_init(&ctx, key);
  }

  void update(const unsigned char *m, size_t bytes ){
    poly1305_update(&ctx, m , bytes);
  }

  void finish(unsigned char *mac){
    poly1305_finish(&ctx, mac);
  }

  int verify (unsigned char *a , unsigned char *b ){
    return poly1305_verify(a, b);
  }

  void auth(unsigned char * mac, unsigned char * m, size_t bytes, const unsigned char *key){
    poly1305_auth(mac, m, bytes, key);
  }

private:
  poly1305_context ctx;

};