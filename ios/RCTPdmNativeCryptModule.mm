#import "RCTPdmNativeCryptModule.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

#import <Foundation/Foundation.h>

//#ifdef __cplusplus

#import "emppIOS.h"
//#import "empp.h"

//#endif

@implementation RCTPdmNativeCryptModule
// Export native 'PdmNativeCryptModule'
RCT_EXPORT_MODULE(PdmNativeCryptModule);
EmppIOS * _h;
//EmppIOS _h;
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
  NSString* b =[_h getHash:(NSString*)a ];
  callback(@[b]);
//  callback(@[@(get_hash_arr(([a UTF8String]), a.length).c_str())]);
}

//- (void)didReceiveMemoryWarning {
//    [super didReceiveMemoryWarning];
//    // Dispose of any resources that can be recreated.
//}
@end
