import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import LoginPagesales from "../pages/Loginsalespage";
import sessionmanager from "../utils/sessionManager";
import Page from "../pages/Page";
setDefaultTimeout(800000);
Given(`user launches Salesforce website`, async function () {
  await LoginPagesales.navigateToApplication("https://login.salesforce.com/");
  await expect(browser).toHaveUrl("https://login.salesforce.com/");
});
When(`user logs into Salesforce`, async function () {
  await LoginPagesales.login("diodezener33@gmail.com", "Diode@123");
  console.log("Enter MFA manually");

  // Wait until login succeeds
  await LoginPagesales.homePageElement.waitForDisplayed({
    timeout: 300000,
    timeoutMsg: "MFA not completed or login failed",
  });
});
Then("save logged session", async function () {
  await browser.waitUntil(
    async () => {
      const cookies = await browser.getCookies();

      return cookies.length > 0;
    },
    {
      timeout: 30000,
      timeoutMsg: "Cookies not loaded",
    },
  );

  await sessionmanager.saveSession();

  console.log("Login successful and session saved");
});
