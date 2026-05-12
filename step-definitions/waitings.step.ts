import { Given } from "@cucumber/cucumber";
import { expect, $ } from '@wdio/globals';
Given("Understanding Browser", async function () {
    await browser.url("https://www.google.com/");
    await browser.pause(2000);
    await browser.waitUntil(async () => {
        return (await browser.getTitle() === "Google",
        { timeout: 5000,interval:500, timeoutMsg: "Expected title to be 'Google' but found " })
    })
    await $('#APjFqb').setValue("WebdriverIO");
    await browser.keys("Enter");
    await browser.pause(2000);
    
    

})