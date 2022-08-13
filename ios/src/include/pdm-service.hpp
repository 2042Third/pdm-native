
/*
DEPRECATED

pdm-service.h

pdm/Personal Data Management system is a encrypted and multiplatform data searching, building, archiving tool.

author:     Yi Yang
            5/2021
*/
#ifndef _pdm_service_
#define _pdm_service_

#include <fstream>
#include <stdio.h>
#include <string>
#include <cstring>
#include <vector>
#ifdef DEEP_DEBUG
#include <iomanip>
#include <iostream>
#endif

// Types
typedef std::vector<uint8_t> Bytes;
template<typename T, int N> using raw_array = T[N];


// Constants
const int MAX_KEY_LENGTH = 32;


template<typename NU>
// void set_conc(NU* s1,NU* s2,unsigned int n);
// Bytes stob (std::string &src);
// std::string btos (Bytes &src);
// std::string pad_to_key (std::string text_key, const int len);

// Addition operation
template<typename NU>
void set_conc(NU* s1,NU* s2,unsigned int n){
    for(unsigned int i=0;i<n;i++)s1[i]+=s2[i];
}

// XOR operation
template<typename NU>
void set_xor(NU* s1,NU* s2,unsigned int n,unsigned int off){
    for(unsigned int i=0;i<n;i++){
        s1[i+off]=s1[i+off]^s2[i];
    }
}

// Convert c++ string into Bytes type

Bytes stob (std::string &src){
    Bytes vec(src.begin(), src.end());
    return vec;
}

template<typename TYP>
void stb (TYP* ot,std::string &src){
    std::copy(src.begin(),src.end(),ot); 
}

template<typename TYP>
std::string bts (TYP*inp){
    std::string ot = (char*)inp;
    return ot;
}


std::string bts(uint8_t *inp,unsigned int n){
    std::vector<char> otvec;
    for(unsigned int i=0;i<n;i++) otvec.push_back(inp[i]);
    std::string ot(otvec.begin(),otvec.end());
    return ot;
}

std::string btos (Bytes &src){
    std::string str(src.begin(), src.end());
    return str;
}


// Return a pointer to an array of the content
std::vector<uint8_t> rd_file (std::string &file_name){
        // Get target file
    std::ifstream infile(file_name, std::ios::binary);
    std::vector<uint8_t> content;
    // uint8_t onec=1;

    if(infile.good())
    content.assign( (std::istreambuf_iterator<char>(infile) ),
                (std::istreambuf_iterator<char>()    ) );
    infile.close();

    return content;
}



void wt_file(std::string file_name, std::string &content){
        // Output the encrypted file
    // std::cout<<content<<std::endl;
    std::ofstream oufile(file_name, std::ios::binary);
    oufile << content;
    // for ()
    oufile.close();
}

void wt_file(std::string file_name, Bytes &content){
        // Output the encrypted file
    // std::cout<<content<<std::endl;
    std::ofstream oufile(file_name,std::ios::binary);
    // for(uint8_t i:content) {oufile.write((char *)&i,sizeof(uint8_t));}
    for(uint8_t i:content) {oufile<<i;}
    oufile.close();
}


std::string pad_to_key (std::string text_key, const int len){
    std::string key;
    key = std::string((len - text_key.size()), '0');
    key = key+text_key;
    return key;
}

#endif