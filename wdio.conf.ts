import dotenv from 'dotenv';
dotenv.config();
import allure from "@wdio/allure-reporter"
import { Options } from '@wdio/types'
import { features } from 'process';
import * as fs from 'fs';
let headless = process.env.HEADLESS
let debug = process.env.DEBUG || 'N'
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

  logLevel: debug.toUpperCase() === 'Y' ? 'debug' : 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'cucumber',
 reporters: [

  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    useCucumberStepReporter: true,
    disableWebdriverScreenshotsReporting: false,
  }]
],

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
    tagExpression: '@validLogin',
    timeouts: 60000,
    ignoreUndefinedDefinitions: false,
  },
  
  /**
   * cucumber hooks
   * @param{string}
   * @param {GherkinDocument.IFeature}
   * 
   */

  // beforeFeature: function(url,feature){

  // },
  afterStep: async function(step,scenario,result){
    console.log(`>>step:${JSON.stringify(step)}`);
    console.log(`>>scenario:${JSON.stringify(scenario)}`);
    console.log(`>>result:${JSON.stringify(result)}`);
    //takes screenshot on failure
    if (!result.passed) {

    const fileName = `${scenario.name.replace(/\s+/g, "_")}.png`;

    await browser.saveScreenshot(
      `../allure-result/screenshot/${fileName}`
    );

    console.log("Screenshot saved");
  }
  },

  afterFeature: function(url, feature) {
    // add more environment details
    (allure as any).addEnvironment("Browser", "Chrome");
  },

}
