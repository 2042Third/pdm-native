#include "memory_mapped_file.hpp"
#include <iostream> // for std::cout and std::endl
#include <algorithm> // for std::copy

int CopyFile(char const* source, char const* dest, bool overwrite)
{
    // Create a read-only memory-mapped-file for reading the source file.
    memory_mapped_file::read_only_mmf source_mf(source);

    // Check that the file has been opened.
    if (! source_mf.is_open()) return 1;

    // Check that the contents of the file has been mapped into memory.
    if (! source_mf.data()) return 2;

    // Create a writable memory-mapped-file for writing
    // the destination file, with the option to overwrite it or not,
    // if such file already exists.
    memory_mapped_file::writable_mmf dest_mf(dest,
        overwrite ? memory_mapped_file::if_exists_truncate :
        memory_mapped_file::if_exists_fail,
        memory_mapped_file::if_doesnt_exist_create);

    // Check that the file has been opened.
    if (! dest_mf.is_open()) return 3;

    // Map into memory a (new) portion of the file,
    // as large as the source file.
    dest_mf.map(0, source_mf.file_size());

    // Check that the contents of the file has been mapped into memory.
    if (! dest_mf.data()) return 4;

    // Check that the source buffer has the same size
    // of the destination buffer. It cannot be otherwise.
    if (source_mf.mapped_size() != dest_mf.mapped_size()) return 5;

    // Check that the source file has the same size
    // of the destination file. It cannot be otherwise.
    if (source_mf.file_size() != dest_mf.file_size()) return 6;

    // Copy the source buffer to the destination buffer.
    std::copy(source_mf.data(), source_mf.data() + source_mf.mapped_size(),
        dest_mf.data());
    return 0;
}

int main()
{
    using namespace std;

    // Copy the first file, overwriting the second file,
    // if it already exists.
    // It should always print 0, meaning success.
    cout << CopyFile("memory_mapped_file.hpp", "copy.tmp", true) << endl;

    // Copy the first file to the second file,
    // but only if the second file does not already exist.
    // It should always print 3, meaning failure to open the second file,
    // as here the second file already exists.
    cout << CopyFile("memory_mapped_file.hpp", "copy.tmp", false) << endl;
}