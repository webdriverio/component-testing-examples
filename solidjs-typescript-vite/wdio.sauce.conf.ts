import type { Options } from '@wdio/types'
import { config as baseConfig } from './wdio.conf.js'

/**
 * With this config you can run all your SolidJS component tests in a cloud
 * using an environment that you don't have available locally or in CI.
 * To run the example, get a free-trial Sauce Labs account and export your
 * credentials into your environment, then run:
 *
 *   $ npm run wdio:sauce
 */
export const config: Options.Testrunner = {
  ...baseConfig,
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  /**
   * for better reporting and integration into Sauce Labs
   */
  services: [['sauce', {
    /**
     * required for making Vite server accessible to cloud browser
     */
    sauceConnect: true
  }]],
  capabilities: [{
    /**
     * this just tests for one (Android) environment but you
     * can add arbitrarily more capabilities to this
     */
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2',
    'sauce:options': {
      // @ts-expect-error capability not defined within WebdriverIO (yet)
      appiumVersion: '1.22.1'
    }
  }]
}
