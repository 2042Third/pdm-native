/**
 * For pdm Android, after procrastinating for better half of a year; this header is indeed
 * needed.
 * Aug, 7, 2022
 * Yi Yang
 * */
#define C20_ECC_SIZE 32

#define C20_EXPORT extern "C"
#define cplusplus_main_compilation (__cplusplus & WEB_TEST)

#include <iostream>
void memclear(uint8_t* a, size_t b );
std::string pp_hash(std::string user1, std::string user2);
const char* pp_hash_c(char* user1, char* user2);

C20_EXPORT
void pp_hash_convert(const char* user1, const char* user2, char* outstr);
void use_vector_string(const std::vector<uint8_t> &vec) ;
std::string loader_check(std::string key, std::string input);

C20_EXPORT
void loader_check_convert(const char* key,  const char* input, size_t input_n, char* outstr);
std::string loader_out(std::string key, const std::string inputi);
C20_EXPORT
void loader_out_convert(const char* key,  const char* inputi, size_t inputi_n, char* outstr);
std::string gen_sec();
std::string gen_pub(std::string a);
std::string gen_shr(std::string a,  std::string c);
std::string get_hash(std::string a);
C20_EXPORT
void get_hash_convert(const char* a, size_t a_n, char* outstr);