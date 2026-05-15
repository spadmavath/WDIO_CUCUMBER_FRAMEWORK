import { Given } from "@cucumber/cucumber";
import SauceLogin from "../pages/SauceLogin";
Given(/^Login into the application as (a|an) (.*)$/, async function (userType,username, dataTable) {
    let dt=dataTable.hashes();
    console.log(`User Type: ${userType} and Username: ${username}`);
    await browser.url("https://www.saucedemo.com/");
    await SauceLogin.usernameInput.setValue(dt[0].username);
    await SauceLogin.passwordInput.setValue(process.env.PASSWORD);
});