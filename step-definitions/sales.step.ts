import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import LoginPagesales from "../pages/Loginsalespage";
import sessionmanager from "../utils/sessionManager";

setDefaultTimeout(800000);

Given(`user launches Salesforce website`, async function () {
    await LoginPagesales.navigateToApplication("https://login.salesforce.com/");
    await expect(browser).toHaveUrl("https://login.salesforce.com/");
});

When(`user logs into Salesforce`, async function () {
    if (sessionmanager.sessionExists()) {
        console.log("Saved session found — restoring...");
        try {
            await sessionmanager.restoreSession();
            console.log("Session restored, skipping login.");
            return; // skip manual login
        } catch (error) {
            console.error("Failed to restore session:", error);
        }
    }
    await LoginPagesales.login("diodezener33@gmail.com", "Diode@123");
    console.log("Enter MFA manually");

    await LoginPagesales.homePageElement.waitForDisplayed({
        timeout: 300000,
        timeoutMsg: "MFA not completed or login failed",
    });
});

Then("save logged session", async function () {
    
    if (!sessionmanager.sessionExists()) {
        await browser.waitUntil(
            async () => {
                const cookies = await browser.getCookies();
                return cookies.length > 0;
            },
            {
                timeout: 30000,
                timeoutMsg: "Cookies not loaded",
            }
        );

        await sessionmanager.saveSession();
        console.log("Login successful and session saved");
    } 
    else {
        console.log("Session was restored — skipping save step");
    }
});