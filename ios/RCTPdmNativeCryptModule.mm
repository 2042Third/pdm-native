#import "RCTPdmNativeCryptModule.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

#import <Foundation/Foundation.h>

#import "empp.h"

@implementation RCTPdmNativeCryptModule
RCT_EXPORT_MODULE(PdmNativeCryptModule);
+ (BOOL)requiresMainQueueSetup
{
  return NO;
}
RCT_EXPORT_METHOD(echoer:( NSString*)a  callback: (RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"Pretending to create an event (this is from a objective-c++ module) %@", a);

  
  callback(@[@"from Objective-C++ .mm"]);
}

RCT_EXPORT_METHOD(getHash:( NSString*)a  callback: (RCTResponseSenderBlock)callback)
{
  std::string input_a = std::string([a UTF8String]);
  std::string out_b = get_hash(input_a);
  NSString *b = [NSString stringWithCString:out_b.c_str()
                                     encoding:[NSString defaultCStringEncoding]];
  callback(@[b]);
}
RCT_EXPORT_METHOD(enc:( NSString*)a data:(NSString*)b callback: (RCTResponseSenderBlock)callback)
{
  std::string input_a = std::string([a UTF8String]);
  std::string input_b = std::string([b UTF8String]);
  std::string out_b = loader_check( input_a, input_b);
  NSString *out_a = [NSString stringWithCString:out_b.c_str()
                                     encoding:[NSString defaultCStringEncoding]];
  callback(@[out_a]);
}
RCT_EXPORT_METHOD(dec:( NSString*)a data:(NSString*)b callback: (RCTResponseSenderBlock)callback)
{
  std::string input_a = std::string([a UTF8String]);
  std::string input_b = std::string([b UTF8String]);
  std::string out_b = loader_out( input_a, input_b);
  NSString *out_a = [NSString stringWithCString:out_b.c_str()
                                     encoding:[NSString defaultCStringEncoding]];
  callback(@[out_a]);
}

@end
