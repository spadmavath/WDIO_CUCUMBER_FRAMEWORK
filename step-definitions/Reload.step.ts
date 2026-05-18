import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";

Given('login to the website', async () => {

   try {
    await browser.url("https://www.saucedemo.com/");

    const username = await $("#user-name");
    const password = await $("#password");
    const loginBtn = await $("#login-button");

    //await username.setValue("standard_user");
    await password.setValue("secret_sauce");

    await loginBtn.click();
   } catch (error) {
   //  console.error("Error during login:", error);
   //  console.log("Attempting to reload the page and retry login...");
    await browser.pause(2000);
    await browser.refresh();
    const username = await $("#user-name");
    const password = await $("#password");
   const loginBtn = await $("#login-button");

 await username.setValue("problem_user");
 await password.setValue("secret_sauce");
  await loginBtn.click();  // Pause to allow for any error messages to be visible
    
   } 


});

// When('Reloading the page', async () => {

//     await browser.reloadSession();
// });

// Then('login with different user', async () => {

//     await browser.url("https://www.saucedemo.com/");

//     const username = await $("#user-name");
//     const password = await $("#password");
//     const loginBtn = await $("#login-button");

//     await username.setValue("problem_user");
//     await password.setValue("secret_sauce");

//     await loginBtn.click();

//     await browser.pause(2000);
// });