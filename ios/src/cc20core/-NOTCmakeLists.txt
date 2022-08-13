cmake_minimum_required(VERSION 3.18)

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -std=c11")
cmake_policy(SET CMP0076 NEW)
add_library(c20_multi SHARED
    cc20_multi.cpp
    )
target_include_directories(c20_multi PUBLIC
    ../include
    ./
    ../lib/
    ../lib/cpp-mmf
    ../lib/poly1305-donna-master/
    ../lib/ecc/
    )
target_compile_options(
    c20_multi PUBLIC
    -g -lpthread -m64 -O3
)
set(PDM_OPTIONS ${PDM_OPTIONS} )
#target_compile_definitions(c20_multi PUBLIC WINDOWS LINUX HAS_MAIN PRINTING DEEP_DEBUG ${PDM_OPTIONS})
target_compile_definitions(c20_multi PUBLIC  LINUX ANDROID  ${PDM_OPTIONS})
#install(FILES libc20_multi.dll DESTINATION ../../)