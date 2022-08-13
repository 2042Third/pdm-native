//
// Created by 18604 on 10/14/2021.
//

#ifndef PDM_CC20_PARTS_H
#define PDM_CC20_PARTS_H
#include <stdio.h>
// /**
//    *  -- replaces cc20_parts
//    * Should contain all things a thread needs, including the encryption 
//    * */
//   struct worker {
//     void set( uint8_t* linew1, size_t n,  uint8_t * line, uint32_t count, Cc20 * ptr);
//     void multi_enc_pthrd();
//     unsigned long int thrd;
//     uint8_t* line;
//     uint8_t* linew;
//     uint32_t count;
//     size_t n;
//   };
class cc20_parts {
public:
  unsigned long int thrd;
  uint8_t* line;
  uint8_t* linew;
  uint32_t count;
  size_t n;

};
#endif //PDM_CC20_PARTS_H
