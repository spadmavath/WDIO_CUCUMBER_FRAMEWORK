import { Given, When, Then } from "@cucumber/cucumber";
import playwrightPage from "../pages/playwrightPage";
import { expect } from "@wdio/globals";
Given("user is on the login page", async function () {
   await playwrightPage.navigateToApplication(
    "https://practicetestautomation.com/practice-test-login/",
  );
  //await playwrightPage.navigateToApplication(process.env.PRACTICE_URL!);
});
When(`user enters valid username and password`, async function () {
  //await playwrightPage.enterUsername(process.env.PRACTICE_USERNAME!);
  //await playwrightPage.enterPassword(process.env.PRACTICE_PASSWORD!);
  await playwrightPage.enterUsername("student");
  await playwrightPage.enterPassword("Password123");
});
When(`clicks on the login button`, async function () {
  await playwrightPage.clickLoginButton();
});
Then(`user should be redirected logout page`, async function () {
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toContain(
    "https://practicetestautomation.com/logged-in-successfully/",
  );
});
