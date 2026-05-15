import dotenv from 'dotenv';
dotenv.config();
import { Options } from '@wdio/types'
let headless=process.env.HEADLESS
//let debug=process.env.DEBUG
export const config: Options.Testrunner & { capabilities: any } = {
  runner: 'local',

  tsConfigPath: './tsconfig.json',

  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 10,

  capabilities:[
    {
      maxInstances:5,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--log-level=3',
          ...(headless?.toUpperCase() === 'Y' ? ['--disable-web-security', '--headless'] : []),
        ],
        excludeSwitches: ['enable-logging'],
      },
    },
  ],

  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require: [],
    import: [
      './support/hooks.ts',
      './step-definitions/**/*.ts',
    ],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '@login',
    timeouts: 60000,
    ignoreUndefinedDefinitions: false,
  },
  
}