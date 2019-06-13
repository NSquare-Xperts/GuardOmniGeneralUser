/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>


@interface AppDelegate (){

  NSString *InstanceID;
}
@property (nonatomic, strong) NSString *strUUID;
@property (nonatomic, strong) NSString *strDeviceToken;
@end

@implementation AppDelegate 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"GeneralUserGO"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  UIUserNotificationType allNotificationTypes =
  (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
  UIUserNotificationSettings *settings =
  [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
  [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  [[UIApplication sharedApplication] registerForRemoteNotifications];

  [FIRApp configure];

  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(tokenRefreshNotification:) name:kFIRInstanceIDTokenRefreshNotification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fcmConnectionStateChange) name:kFIRInstanceIDTokenRefreshNotification object:nil];

//  NSArray *familyNames = [UIFont familyNames];

//  for( NSString *familyName in familyNames ){
//    printf( "Family: %s \n", [familyName UTF8String] );
//    NSArray *fontNames = [UIFont fontNamesForFamilyName:familyName];
//    for( NSString *fontName in fontNames ){
//      printf( "\tFont: %s \n", [fontName UTF8String] );
//    }
//  }

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
 
  NSLog(@"Message ID: %@", userInfo[@"gcm.message_id"]);
  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];

  NSLog(@"userInfo=>%@", userInfo);
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {

  [FIRMessaging messaging].APNSToken = deviceToken;
  NSLog(@"deviceToken1 = %@",deviceToken);


}

- (void)tokenRefreshNotification:(NSNotification *)notification {
  NSLog(@"instanceId_notification=>%@",[notification object]);
  InstanceID = [NSString stringWithFormat:@"%@",[notification object]];

  [self connectToFcm];
}

- (void)connectToFcm {
  FIRMessaging.messaging.shouldEstablishDirectChannel = true;
}

- (void)fcmConnectionStateChange {
  if (FIRMessaging.messaging.isDirectChannelEstablished) {
    NSLog(@"Connected To FCM");
  }else {
    NSLog(@"Disconnected from FCM");
  }
}

@end
