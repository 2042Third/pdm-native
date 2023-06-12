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
RCT_EXPORT_METHOD(
    echoer:( NSString*)a
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
{
  RCTLogInfo(@"Pretending to create an event (this is from a objective-c++ module) %@", a);
  resolve(@[@"from Objective-C++ .mm"]);

//       callback(@[@"from Objective-C++ .mm"]);
}

RCT_EXPORT_METHOD(
    getHash:( NSString*)a
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)

{
  std::string input_a = std::string([a UTF8String]);
  std::string out_b = get_hash(input_a);
  NSString *b = [NSString stringWithCString:out_b.c_str()
                                     encoding:[NSString defaultCStringEncoding]];
  resolve(@[b]);
}

RCT_EXPORT_METHOD(
    enc:( NSString*)a
    data:(NSString*)b
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
                  )
{
  std::string input_a = std::string([a UTF8String]);
  std::string input_b = std::string([b UTF8String]);
  std::string out_b = loader_check( input_a, input_b);
  NSString *out_a = [NSString stringWithCString:out_b.c_str()
                                     encoding:[NSString defaultCStringEncoding]];

    if (out_a){
      resolve(@[out_a]);
    }
    else {
      reject(@"Encryption failure",@"Encryption failed" , nil);
    }
}

RCT_EXPORT_METHOD(
  dec:(NSString*)a
  data:(NSString*)b
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)
{
  RCTLogInfo(@"Native decryption receives %@, ps %@", b, a);
  
  if (!a || !b) {
    reject(@"Invalid inputs", @"One or more inputs are null", nil);
    return;
  }
  
  const char *c_string_a = [a UTF8String];
  const char *c_string_b = [b UTF8String];
  
  if (!c_string_a || !c_string_b) {
    reject(@"Conversion failure", @"Failed to convert one or more inputs to UTF8", nil);
    return;
  }
  
  std::string input_a(c_string_a);
  std::string input_b(c_string_b);
  
  try {
      std::string out_b = loader_out(input_a, input_b);
      NSString *out_a = [NSString stringWithCString:out_b.c_str()
                                           encoding:[NSString defaultCStringEncoding]];
      
      if (out_a){
        resolve(@[out_a]);
      }
      else {
        reject(@"Decryption failure", @"password incorrect", nil);
      }
    } catch (const std::exception& e) {
      reject(@"Decryption failure", [NSString stringWithUTF8String:e.what()], nil);
    }
}

@end
