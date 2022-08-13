#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "cc20_wrapper.h"

void hash_test(const char * part, long int part_n, char * h){
  hash_wrap(part, part_n, h);
  printf("This is the hash of %s:\n \t %s \n",part, h);
}

int main(const int argc, const char **argv){
  static const char part[] = "hello";
  long int part_n = 5;
  // hash test
  char h[65]={0};
  h[64] = '\0';
  hash_test(part,part_n,h );
  // Encryption test
  
  static const char msg[] = "this is a message";
  long int msg_n = 17;
  char enc_msg[91];
  enc_msg[90]='\0';
  char dec_msg[46];
  dec_msg[45]='\0';
  loader_check_wrap(part,msg,msg_n,enc_msg); // encryption
  printf("This is the encrypted msg of %s:\n \t %s \n",msg, enc_msg);
  loader_out_wrap(part,enc_msg,45,dec_msg); // encryption
  printf("This is the decrypted msg of %s:\n \t %s \n",enc_msg, dec_msg);


  return( EXIT_SUCCESS );
}
 