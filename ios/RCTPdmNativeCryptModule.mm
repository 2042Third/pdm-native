#import "RCTPdmNativeCryptModule.h"
//#import "RCTLog.h"
//#import <React/RCTUIManager.h>
//#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
//#import <React/UIView+React.h>
#import <React/RCTConvert.h>

#import <Foundation/Foundation.h>
//#pragma mark - RCTPdmNativeCryptModule

@implementation RCTPdmNativeCryptModule
// Export native 'PdmNativeCryptModule'
RCT_EXPORT_MODULE(PdmNativeCryptModule);

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

//RCT_EXPORT_METHOD(echoer1:(nonnull NSString*)a withB:(nonnull NSString*)b resolver:(RCTPromiseResolveBlock)resolve
//withReject:(RCTPromiseRejectBlock)reject)
//{
//  NSString log_info = (@"Pretending to create an event (this is from a objective-c++ module) %@ at %@", a, b);
//  RCTLogInfo(log_info);
//
//  resolve(@{
//            @"result": @(result)
//  });
//}
RCT_EXPORT_METHOD(echoer:(nonnull NSString*)a  resolver:(RCTPromiseResolveBlock)resolve)
{
  RCTLogInfo(@"Pretending to create an event (this is from a objective-c++ module) %@", a);

  resolve(@{
            @"result": @("from Objective-C++ .mm")
  });
}

@end
