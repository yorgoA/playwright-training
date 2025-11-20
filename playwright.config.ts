import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = ({
  testDir: './tests',
  timeout: 10 * 1000, //timeout for all the tests
  expect: {
    timeout: 5000 //timeout for each expect assertion
  },
use: {
  browserName: 'chromium',
  headless: false,
screenshot: 'only-on-failure',
trace: 'retain-on-failure',

  },
  reporter: [['html',]],
});
module.exports = config;
