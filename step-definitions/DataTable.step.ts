import { Given, When } from "@cucumber/cucumber";
import SauceLogin from "../pages/SauceLogin";
import logger from "../helper/logger";
import allure from "@wdio/allure-reporter";
Given(
  /^Login into the application as (a|an) (.*)$/,
  async function (article, userType, dataTable) {
    logger.info(`${this.testCaseId} : Started login into the application`);
    allure.addStep(`${this.testCaseId} : Started login into the application`);
    let dt = dataTable.hashes();
    //console.log(`User Type: ${userType} and Username: ${dt[0].username}`);
    await browser.url("https://www.saucedemo.com/");
    await SauceLogin.usernameInput.setValue(dt[0].username);
    await SauceLogin.passwordInput.setValue(process.env.TEST_PASSWORD);
  },
);
When(`user clicks on login button`, async function () {
  // console.log(WDIO); // REFERENCE ERROR: WDIO is not defined
  await SauceLogin.loginButton.click();
  logger.info(`${this.testCaseId} : Clicked on login button and logged in `);
  allure.addStep(
    `${this.testCaseId} :  suscessfully logged in to the appliction `,
  );
});
