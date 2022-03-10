import config from './wdio.shared.sauce.conf';

const buildName = `Android My React Native Demo app: ${new Date().getTime()}`;

// ==================
// Specify Test Files
// ==================
//
config.specs = ['./test/**/android.spec.ts'];

// ============
// Capabilities
// ============
//
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  //{
    // The defaults you need to have in your config
    //platformName: 'Android',
    // We're using dynamic device allocation
    // See https://docs.saucelabs.com/mobile-apps/automated-testing/appium/real-devices/#dynamic-device-allocation
    // deviceName: '(Samsung Galaxy S(7|8|9|10|20|21).*)|(Google Pixel (3|4).*)',
    //deviceName: 'Samsung Galaxy S9 Plus FHD GoogleAPI Emulator',
    //automationName: 'UIAutomator2',
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    //app: 'storage:filename=mrum-11-02.apk',
    //newCommandTimeout: 2400,
    // Select only phone devices
    // @ts-ignore
    //autoGrantPermissions: true,
  //},
  {
    // The defaults you need to have in your config
    platformName: 'Android',
    'appium:deviceName': 'Google Pixel 3 GoogleAPI Emulator',
    'appium:platformVersion': '10.0',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'storage:filename=mrum-11-02.apk',
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    'appium:noReset': true,
    'appium:newCommandTimeout': 2400,
    'appium:autoGrantPermissions': true,
  },
];

exports.config = config;
