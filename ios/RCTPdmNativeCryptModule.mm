#import "RCTPdmNativeCryptModule.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

#import <Foundation/Foundation.h>

//#ifdef __cplusplus

//#import "emppIOS.h"
#import "empp.h"

//#endif

@implementation RCTPdmNativeCryptModule
// Export native 'PdmNativeCryptModule'
RCT_EXPORT_MODULE(PdmNativeCryptModule);
//EmppIOS * empp_lib;
//EmppIOS _h;
+ (BOOL)requiresMainQueueSetup
{
  return NO;
}
//std::string cppString(NSString *s)
//{
//  return [s cStringUsingEncoding:DESIRED_ENCODING];
//}
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

@end
