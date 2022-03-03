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
  {
    // The defaults you need to have in your config
    platformName: 'Android',
    // We're using dynamic device allocation
    // See https://docs.saucelabs.com/mobile-apps/automated-testing/appium/real-devices/#dynamic-device-allocation
    deviceName: '(Samsung Galaxy S(7|8|9|10|20|21).*)|(Google Pixel (3|4).*)',
    automationName: 'UIAutomator2',
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    app: 'storage:filename=mrum-11-02.apk',
    newCommandTimeout: 2400,
    // Select only phone devices
    // @ts-ignore
    autoGrantPermissions: true,
  },
];

exports.config = config;
