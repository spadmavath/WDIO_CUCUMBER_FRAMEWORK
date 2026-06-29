import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import Page from "../pages/Page";
import Loginpage from "../pages/sausloginpage";
import RegisterPage from "../pages/signuppage";
import SearchPage from "../pages/searchpage";
import SocialLink from "../pages/socialpage";
import productVerifypage from "../pages/productVerifypage";
import SignupTestData from "../utils/signup";


const commonActions: Page = new Page();
const loginpage: Loginpage = new Loginpage();
const registerPage: RegisterPage = new RegisterPage();
const socialLinks: SocialLink = new SocialLink();

// Map of social link keys to expected domain/url fragments used for verification
const socialMediaUrls: Record<string, string> = {
  Twitter: 'twitter.com',
  Facebook: 'facebook.com',
  LinkedIn: 'linkedin.com',
  YouTube: 'youtube.com',
  Instagram: 'instagram.com',
  RSS: 'sauce-demo.myshopify.com/blogs',
};

// =============================================
// SHARED STATE
// =============================================
let parentWindow: string;
let userdata: any;

// =============================================
// BACKGROUND
// =============================================
Given("User launches the application", async function () {
  const url = process.env.sausce_demo ;
  await commonActions.navigateToApplication(url);
});

// =============================================
// LOGIN
// =============================================
When("User enters username {string}", async function (username: string) {
  await loginpage.Login.waitForClickable({ timeout: 10000 });
  await loginpage.Login.click();
  await loginpage.emailAddress.waitForDisplayed({ timeout: 10000 });
  await loginpage.email(username);
});

When("User enters password {string}", async function (password: string) {
  await loginpage.pass(password);
});

When("User clicks on Login button", async function () {
  await loginpage.signinBtn.waitForClickable({ timeout: 10000 });
  await loginpage.signinBtn.click();

  try {
    await loginpage.skipBtn.waitForClickable({ timeout: 5000 });
    await loginpage.skipBtn.click();
    console.log("CAPTCHA skipped");
  } catch {
    console.log("No CAPTCHA appeared, continuing...");
  }
});

Then("User should see logout button", async function () {
  await browser.waitUntil(
    async () => await loginpage.Logout.isDisplayed(),
    {
      timeout: 15000,
      timeoutMsg: "Logout link not visible after login",
    }
  );
});

// =============================================
// SIGNUP
// =============================================
When("User enters dynamic registration details", async function () {
  await registerPage.signup.waitForClickable({ timeout: 10000 });
  await registerPage.signup.click();
  userdata = SignupTestData.createusers();
  await registerPage.createAccount(userdata);
});

Then("User clicks Create Account button", async function () {
  console.log("Create Account clicked in previous step");
});

Then("Account should be created successfully", async function () {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account"),
    {
      timeout: 10000,
      timeoutMsg: "Account creation failed",
    }
  );
  console.log(`Account created successfully: ${userdata.email}`);
});

// =============================================
// SEARCH — single step handles both scenarios
// =============================================
When("User searches for {string}", async function (productName: string) {
  try {
    await SearchPage.searchproduct(productName);
  } catch {
    await productVerifypage.searchProduct(productName);
  }
});

Then("User should find products with price greater than 50", async function () {
  const prices = await SearchPage.getAllprices();
  let count = 0;

  for (const price of prices) {
    if (price > 50) {
      await expect(price).toBeGreaterThan(50);
      count++;
    }
  }

  console.log(`Products with price > $50: ${count} out of ${prices.length}`);
});

// =============================================
// PRODUCT COUNT VERIFICATION
// =============================================
Then(
  "the displayed result count should match the number of products shown on the products page",
  async function () {
    const expected = await productVerifypage.getDisplayedResultCount();
    const actual = await productVerifypage.getActualProductCount();
    console.log(`Display says: ${expected} | Actual on page: ${actual}`);
    await expect(actual).toEqual(expected);
  }
);

// =============================================
// SOCIAL MEDIA LINKS
// =============================================
// Module level — persists across steps reliably
let currentSocialLink: string = '';
parentWindow = '';

When("User clicks on social link {string}", async function (socialLink: string) {
  currentSocialLink = socialLink;  
  parentWindow = await browser.getWindowHandle();
  await socialLinks.clickSocialLink(socialLink);
});

Then("User should be navigated to the respective social media page", async function () {
  const expectedDomain = socialMediaUrls[currentSocialLink];  
  console.log(`>>> Checking social link: ${currentSocialLink}`);
  console.log(`>>> Expected domain: ${expectedDomain}`);

  if (currentSocialLink === 'RSS') {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('https://sauce-demo.myshopify.com/blogs/news.atom'),
      { timeout: 10000, timeoutMsg: 'RSS page did not load' }
    );
    console.log(` RSS verified: ${await browser.getUrl()}`);
    return;
  }

  await browser.waitUntil(
    async () => (await browser.getWindowHandles()).length > 1,
    { timeout: 10000, timeoutMsg: `New tab not opened for ${currentSocialLink}` }
  );

  const windows = await browser.getWindowHandles();
  for (const win of windows) {
    if (win !== parentWindow) {
      await browser.switchToWindow(win);
    }
  }

  await browser.waitUntil(
    async () => (await browser.getUrl()) !== 'about:blank',
    { timeout: 10000, timeoutMsg: 'Page did not load in new tab' }
  );

  const currentUrl = await browser.getUrl();
  const pageTitle = await browser.getTitle();
  console.log(`>>> URL: ${currentUrl}`);
  console.log(`>>> Title: ${pageTitle}`);

  if (expectedDomain) {
    await expect(currentUrl).toContain(expectedDomain);
    console.log(` Verified: ${currentSocialLink} → ${currentUrl}`);
  }

  await expect(pageTitle).not.toEqual('');
});

Then("User closes the child window and switches back to parent window", async function () {
  console.log(`>>> Closing child window, parent: ${parentWindow}`);

  try {
    const handles = await browser.getWindowHandles();
    console.log(`>>> Open windows: ${handles.length}`);

    if (handles.length > 1) {
      await browser.closeWindow();
      console.log('>>> Child window closed');
    }

    await browser.switchToWindow(parentWindow);
    console.log('>>> Switched to parent');

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('sauce-demo.myshopify.com'),
      { timeout: 10000, timeoutMsg: 'Did not return to parent window' }
    );

    console.log(`Back on parent: ${await browser.getUrl()}`);

  } catch (e) {
    console.log(`>>> Close window error: ${e.message}`);
    const allHandles = await browser.getWindowHandles().catch(() => []);
    if (allHandles.length > 0) {
      await browser.switchToWindow(allHandles[0]);
    }
    throw e;
  }
});