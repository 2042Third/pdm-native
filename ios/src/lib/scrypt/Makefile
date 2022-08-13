# By Yi Yang
# PDM
# May 2022

CC  ?= gcc
CXX ?= g++

TARGET_EXEC ?= scrypt_test

BUILD_DIR ?= ./build
SRC_DIRS ?= ./

 SRCS := $(shell find $(SRC_DIRS) -name *.cpp -or -name *.c -or -name *.s)
#SRCS = ./src/cc20_file.cpp \
#./lib/sha3.cpp \
#./lib/cpp-mmf/memory_mapped_file.cpp \
#./lib/poly1305-donna-master/poly1305-donna.cpp \
#./lib/ecc/ecdh_curve25519.c \
#./lib/ecc/curve25519.c \
#./lib/ecc/fe25519.c \
#./lib/ecc/bigint.c \
#./src/ec.cpp \
#./src/cc20_multi.cpp \
#./src/cc20_wrapper.cpp \
#./src/cmain.c
OBJS := $(SRCS:%=$(BUILD_DIR)/%.o)
DEPS := $(OBJS:.o=.d)

 INC_DIRS := $(shell find $(SRC_DIRS) -type d)
INC_FLAGS := $(addprefix -I,$(INC_DIRS))

#ALLFLAGS ?= -MMD -MP -D AUTOMAKING -g \
#	-I./lib/ \
#	-I./lib/ecc -I./lib/cpp-mmf \
#	-I./lib/poly1305-donna-master \
#	-I./include
CXXFLAGS ?= $(INC_FLAGS) -O3 -std=c++17 -lpthread
CFLAGS   ?= $(INC_FLAGS) -O3 -std=c17

$(BUILD_DIR)/$(TARGET_EXEC): $(OBJS)
	$(CXX) $(OBJS) -o $@ $(LDFLAGS)

# assembly
$(BUILD_DIR)/%.s.o: %.s
	$(MKDIR_P) $(dir $@)
	$(AS) $(ASFLAGS) -c $< -o $@

# c source
$(BUILD_DIR)/%.c.o: %.c
	$(MKDIR_P) $(dir $@)
	$(CC) $(ALLFLAGS)  $(CFLAGS) -c $< -o $@

# c++ source
$(BUILD_DIR)/%.cpp.o: %.cpp
	$(MKDIR_P) $(dir $@)
	$(CXX) $(ALLFLAGS) $(CXXFLAGS) -c $< -o $@


.PHONY: clean

clean:
	$(RM) -r $(BUILD_DIR)

-include $(DEPS)

MKDIR_P ?= mkdir -p
