
#include "cc20_file.h"
#include <iostream> // for std::cout and std::endl
#include <algorithm> // for std::copy

using namespace std;

/**
 * Constructor
 * */
cc20_file::cc20_file (const char* f_name){
  source_mf = new memory_mapped_file::read_only_mmf(f_name);
}

/**
 * Replaces the existing file binding if it exists.
 * 
 * */
void cc20_file::read_new(const char* f_name){
  if(source_mf!=NULL) delete source_mf;
  source_mf = new memory_mapped_file::read_only_mmf(f_name, false);
}

/**
 * Replaces the existing writing file binding if it exists.
 * 
 * */
void cc20_file::write_new(const char* f_name, int overwrite){
  dest_mf = new memory_mapped_file::writable_mmf(f_name,
        overwrite ? memory_mapped_file::if_exists_truncate :
        memory_mapped_file::if_exists_fail,
        memory_mapped_file::if_doesnt_exist_create);
}

/*a test*/
void cc20_file::run_test(const char* f_name){
  read_new(f_name);
  memory_mapped_file::read_only_mmf mmf = get_read();
  // mmf.open(pathname, false);
  mmf.map(0, mmf.file_size());
  cout <<"mmf.is_open(): \t\t"<< mmf.is_open() << endl;
  cout <<"mmf.file_size(): \t"<<  mmf.file_size() << endl;
  cout <<"mmf.offset(): \t\t"<<  mmf.offset() << endl;
  cout <<"mmf.mapped_size(): \t"<<  mmf.mapped_size() << endl;
  mmf.unmap();
  cout <<"mmf.is_open(): \t\t"<< mmf.is_open() << endl;
  cout <<"mmf.file_size(): \t"<<  mmf.file_size() << endl;
  cout <<"mmf.offset(): \t\t"<<  mmf.offset() << endl;
  cout <<"mmf.mapped_size(): \t"<<  mmf.mapped_size() << endl;
}
/*a test*/
void cc20_file::run_test(){
  // read_new(f_name);
  memory_mapped_file::read_only_mmf mmf = get_read();
  // mmf.open(pathname, false);
  // mmf.map(0, mmf.file_size());
  cout <<"mmf.is_open(): \t\t"<< mmf.is_open() << endl;
  cout <<"mmf.file_size(): \t"<<  mmf.file_size() << endl;
  cout <<"mmf.offset(): \t\t"<<  mmf.offset() << endl;
  cout <<"mmf.mapped_size(): \t"<<  mmf.mapped_size() << endl;
  
}


memory_mapped_file::read_only_mmf cc20_file::get_read(){
  return *source_mf;
}

/**
 * Destructor
 * */
cc20_file::~cc20_file(){
  if(source_mf!=NULL) delete source_mf;
  if(dest_mf!=NULL) delete dest_mf;
}