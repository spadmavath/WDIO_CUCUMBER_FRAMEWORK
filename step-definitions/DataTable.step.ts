import { Given, When } from "@cucumber/cucumber";
import SauceLogin from "../pages/SauceLogin";
import logger from "../helper/logger"
Given(/^Login into the application as (a|an) (.*)$/, async function (article, userType, dataTable) {
    logger.info(`${this.testCaseId} : Started login into the application`);
    let dt=dataTable.hashes();
    //console.log(`User Type: ${userType} and Username: ${dt[0].username}`);
    await browser.url("https://www.saucedemo.com/");
    await SauceLogin.usernameInput.setValue(dt[0].username);
    await SauceLogin.passwordInput.setValue(process.env.TEST_PASSWORD);
});
When(`user clicks on login button`, async function () {
    await SauceLogin.loginButton.click();
});