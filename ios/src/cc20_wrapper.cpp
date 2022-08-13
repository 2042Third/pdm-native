/**
 * C wrapper for c20 encryption library used for pdm.
 * 
 * Yi Yang 
 * */
#include "cc20_wrapper.h"
#ifndef EMPP_CPP
#include "empp.h"
#endif
// void pp_hash_wrap(const char* u1, size_t u1_n, const char* u2, size_t u2_n, char* outstr){
void pp_hash_wrap(const char* u1, const char* u2, char* outstr){
  pp_hash_convert( u1,  u2, outstr);
  return;
}

void hash_wrap(const char* a, long int a_n, char* outstr){
  get_hash_convert( a, a_n, outstr);
  return;
}

void loader_check_wrap(const char* key,  const char* input, long int  input_n, char* outstr){
  loader_check_convert(key, input, (size_t)input_n, outstr);
  return;
}

void loader_out_wrap(const char* key,  const char* inputi, long int  inputi_n, char* outstr){
  loader_out_convert(key, inputi, (size_t)inputi_n, outstr);
  return;
}