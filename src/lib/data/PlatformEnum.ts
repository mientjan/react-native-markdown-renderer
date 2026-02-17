export const PlatformEnum = {
  IOS: 'ios',
  ANDROID: 'android',
} as const;

export type PlatformType = (typeof PlatformEnum)[keyof typeof PlatformEnum];

export default PlatformEnum;
