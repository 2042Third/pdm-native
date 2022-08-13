#pragma once

#ifdef __cplusplus
extern "C" 
{
#endif
void pp_hash_wrap(const char* u1, const char* u2, char* outstr);
void hash_wrap(const char* a, long int a_n, char* outstr);
void loader_check_wrap(const char* key,  const char* input,  long int input_n, char* outstr);
void loader_out_wrap(const char* key,  const char* inputi,  long int inputi_n, char* outstr);
#ifdef __cplusplus
}
#endif