//
// Created by Yi Yang on 6/30/2022.
//
#ifndef PDM_STANDALONE_CPP
#define PDM_STANDALONE_CPP
#include <iostream>
#include <ostream>
#include <iterator>
#include <random>
#include "types.h"

namespace  pdmMain{
void init_byte_rand_cc20Main(Bytes &a, int n) {
  for (int i = 0; i < n; i++) {
    std::random_device rd;   // non-deterministic generator
    std::mt19937 gen(rd());
    a.push_back((uint8_t) gen());
  }
}

std::string btosMain(Bytes &src) {
  std::string str(src.begin(), src.end());
  return str;
}

}
#endif
