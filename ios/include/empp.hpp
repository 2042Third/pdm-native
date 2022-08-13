#pragma once
#include <string>

#if defined(__clang__)
#define SHARED_EXPORT __attribute__((visibility("default")))
#define SHARED_LOCAL __attribute__((visibility("hidden")))
#endif

#if defined(IS_BUILDING_SHARED)
#define API SHARED_EXPORT
#else
#define API
#endif

#include "include/empp.h"
#include <iostream>


class API empp
{
public:
  std::string _get_hash(std::string a){
    return get_hash(a);
  }
};