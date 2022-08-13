//
// Created by Yi Yang on 6/26/2022.
//

#ifndef CC20_MULTI_XCC20_H
#define CC20_MULTI_XCC20_H

#ifndef _cc20_multi_
#include "cc20_multi.h"
#endif
#include <iostream>


class xCc20 : public Cc20 {

  uint8_t xnonce_orig[XNONCE_SIZE+1]={0};
public:
  struct xworker {
    void x_set(size_t thrd_in, uint8_t* linew0, size_t n_in, uint8_t * line, uint32_t xcount,xCc20 * ptr);
    void x_multi_enc_pthrd();
    unsigned long int xthrd;
    uint8_t* xline;
    uint8_t* xlinew1;
    uint32_t count;
    size_t xn;
  };
//  void x_one_block(int thrd);

  void x_rd_file_encr(std::string file_name, std::string oufile_name);

  void x_rd_file_encr(uint8_t * buf, uint8_t* outstr, std::size_t input_length);

  void h_set_vals(uint8_t * nonce0, uint8_t*key0);

  void x_set_vals(uint8_t * nonce0, uint8_t*key0);

  char * xget_inp_nonce(std::string infile_name, unsigned char *line1);

  void xone_block(int thrd, uint32_t count);

  xworker* xarg_track[THREAD_COUNT];
  xCc20();
  ~xCc20();
};

void x_cmd_enc(std::string infile_name, std::string oufile_name, std::string text_nonce, c20::config configs);

#endif //CC20_MULTI_XCC20_H
