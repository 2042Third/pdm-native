ver = -m64 -std=c++17 
dflg =  -g -Wall -fconcepts -D PRINTING
dpflg = -D DEEP_DEBUG -lm -D HARD_CODE_DEBUG
# file1 = c20_dev.cpp
# file2 = cc20_dev.cpp
file3 = cc20_multi.cpp
sys1 = -D WINDOWS
sys2 = -D LINUX -pthread
sys3 = -D MAC
hash =  -g 
boost= -O3 -I../lib/ -I../lib/boost_1_78_0 -I../lib/ecc -I../include/ -D HAS_MAIN
# incmac =  -lboost_thread -lpthread 
incmac =  -lpthread 
inc = -lpthread $(libr)
# inc =-I../lib/boost-linux/ -L../lib/boost-linux/stage/lib -lboost_thread -pthread
mac = -D MAC_OS  
src_ = ../src
libr = -I../lib/poly1305-donna-master/ 
win32 = -D WINDOWS 


release_en= -m64 -std=c++17  cc20_multi.cpp -D DEEP_DEBUG -lm  -Wall -fconcepts -D PRINTING -O1 -D LINUX  -o c20.o
release_de= -m64 -std=c++17  cc20_multi.cpp -D DEEP_DEBUG -lm  -Wall -fconcepts -D PRINTING -O1 -D LINUX -D DE -o c20de.o
release_en1= -m64 -std=c++17  cc20_multi.cpp  -D LINUX -o c20
xrelease_en= -m64 -std=c++17  xCc20.cpp  -D LINUX -o c20
ecc_flags =  -m64 -std=c++17 -D LINUX -o ecc_test
debug_web= -m64 -std=c++17  cc20_multi.cpp  -D LINUX   -D WEB_RELEASE -D WEB_TEST -O2 -I../lib/ -I../include/
release_de1= -m64 -std=c++17  cc20_multi.cpp   -D LINUX -o c20
en_debug= -m64 -std=c++11  cc20_multi.cpp  -lm  -Wall -D DEEP_DEBUG -D PRINTING -D LINUX -o d20
de_debug= -m64 -std=c++11  cc20_multi.cpp  -lm  -Wall -D DEEP_DEBUG -D PRINTING -D LINUX -D DE -o d20de
release_en12= -m64 -std=c++17  cc20_multi.cpp  -lm  -Wall -D DEEP_DEBUG -D PRINTING -D ROUNDCOUNTTWLV -D LINUX -o c20.c
release_de12= -m64 -std=c++17  cc20_multi.cpp -lm  -Wall -D DEEP_DEBUG -D PRINTING -D ROUNDCOUNTTWLV -D LINUX -D DE -o c20de.c

# new version
srcs = lib/cc20_file.cpp \
	lib/sha3.cpp \
	lib/cpp-mmf/memory_mapped_file.cpp \
	lib/poly1305-donna-master/poly1305-donna.c \
	lib/ecc/ecdh_curve25519.c \
	lib/ecc/curve25519.c \
	lib/ecc/fe25519.c \
	lib/ecc/bigint.c \
	lib/scrypt/src/hmac.c \
	lib/scrypt/src/pbkdf2.c \
	lib/scrypt/src/salsa20.c \
	lib/scrypt/src/scrypt.c \
	lib/scrypt/src/sha256.c \
	lib/ec.cpp \
	cc20core/cc20_multi.cpp

all_includes = -I./include \
-I./lib \
-I./lib/nonwasm \
-I./lib/cpp-mmf \
-I./lib/poly1305-donna-master \
-I./lib/ecc \
-I./lib/scrypt/include \
-I./lib/scrypt

all_defs = -DWINDOWS -DLINUX -DHAS_MAIN
options = -g -lpthread -m64 -O3 -pthread


windows:
	g++ $(all_includes) $(srcs) $(options) $(all_defs) -fpermissive -std=c++17 desktop.cpp -Wall -o build/c20
linux:
	g++ $(boost) $(release_en1) $(srcs) $(inc) -Wall -g
xwindows:
	g++ $(boost) $(xrelease_en) $(srcs) $(inc) $(win32) -Wall

windows_single:
	g++ $(boost) $(release_en1) $(srcs) $(inc) $(win32) -D SINGLETHREADING
windows_debug:
	g++ $(boost) $(release_en1) $(srcs) $(inc) $(win32) -g -DFOURCORE
release_en:
	g++ $(hash) $(boost) $(release_en) $(inc)
release_de:
	g++ $(hash) $(boost) $(release_de) $(inc)
# ecc_test:
# 	g++ -Wall -O2 -g ../test/ecc_test.cpp -I../lib/ecc \
# 	$(boost) $(ecc_flags) $(libec_src) $(inc) $(win32) 
en:
	clang++ $(boost) $(srcs) $(release_en1) $(inc)
en_single:
	clang++ $(boost) $(srcs) $(release_en1) $(inc) -D SINGLETHREADING
de:
	clang++ $(boost) $(srcs) $(release_de1) $(inc) -g

desktop_c:
	gcc  -I$(MINGW_INC_PATH)/include/llvm/Support -I../lib/ecc -I../include/ $(src_)/empp.cpp $(srcs) $(debug_web) $(inc) -g -D SINGLETHREADING -o ../test/web_debug

web_linux:
	g++  $(all_includes) $(srcs) $(all_defs) -fpermissive -std=c++17 desktop.cpp -Wall \
 -O3 -D LINUX  -D WEB_RELEASE -lpthread \
 -D WEB_RELEASE_LINUX_TEST -g -o ./tests/webc20
web_linux_debug:
	g++  $(all_includes) $(srcs) $(all_defs) -fpermissive -std=c++17 desktop.cpp -Wall \
 -D LINUX  -D WEB_RELEASE -lpthread -Wall -D DEEP_DEBUG -D PRINTING \
 -D WEB_RELEASE_LINUX_TEST -g -o ./tests/webc20

CC  ?= gcc
CXX ?= g++

CFLAGS = -Os -g -Wall -pedantic -std=c18
CXXFLAGS = -Os -g -Wall -pedantic -std=c++20

OBJ	= cmain cc20_wrapper cc20_multi cc20_file sha3 empp memory_mapped_file poly1305-donna ecdh_curve25519 fe25519 bigint ec
OBJS  = $(addsuffix .o,$(OBJ))
all:
	make compile

compile:
	make $(OBJS)
	make c20wrapper

c20wrapper: $(OBJS) 
	$(CXX) -o c20wrapper $(OBJS)

cmain.o: cmain.c
	$(CC) $(CFLAGS) -I../include/ -c -o cmain.o cmain.c

cc20_wrapper.o: cc20_wrapper.cpp
	$(CXX) $(CXXFLAGS)  -I../lib/ecc -I../include/ $(inc) -c -o cc20_wrapper.o cc20_wrapper.cpp 
	
	
clean:
	rm -rf $(OBJS) c20wrapper *.dSYM

wrapper_test:
	make compile

