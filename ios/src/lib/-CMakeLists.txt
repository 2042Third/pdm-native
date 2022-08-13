cmake_minimum_required(VERSION 3.18)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -std=c11")
cmake_policy(SET CMP0076 NEW)
add_library(c20_lib SHARED
    ../include/cc20_dev.hpp
    cc20_file.h
    ../include/cc20_multi.h
    ../include/xCc20.h
    ecc/ecdh_curve25519.c
    cpp-mmf/memory_mapped_file.cpp
    poly1305-donna-master/poly1305-donna.cpp
    poly1305-donna-master/poly1305-donna.h
    ecc/curve25519.c
    ecc/fe25519.c
    ecc/bigint.c
    ec.cpp
    cc20_file.cpp
    sha3.cpp
    sha3.h
    nonwasm/endian.h
    scrypt/include/scrypt.h
    cc20_scrypt.h
    scrypt/src/hmac.h
    scrypt/src/pbkdf2.h
    scrypt/src/salsa20.h
    scrypt/src/scrypt.h
    scrypt/src/sha256.h
    scrypt/src/hmac.c
    scrypt/src/pbkdf2.c
    scrypt/src/salsa20.c
    scrypt/src/scrypt.c
    scrypt/src/sha256.c
    stand_alone.cpp wasm/endian.h)
target_compile_options(
    c20_lib PUBLIC
    -m64 -O3
)
target_include_directories(c20_lib PUBLIC
    ../include
    ./
    cpp-mmf
    poly1305-donna-master/
    ecc/
    scrypt/include
    scrypt/
    )

#install(FILES libc20_lib.dll DESTINATION ../../)