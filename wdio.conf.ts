import { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: 'local',

  tsConfigPath: './tsconfig.json',

  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--log-level=3',
        ],
        excludeSwitches: ['enable-logging'],
      },
    },
  ],

  logLevel: 'warn',
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
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
}