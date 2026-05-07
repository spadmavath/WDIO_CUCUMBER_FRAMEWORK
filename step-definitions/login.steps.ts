import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

Given('I open the login page', async () => {
    await browser.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const loginPageTitle = await browser.getTitle();
    await expect(loginPageTitle).toEqual('OrangeHRM');
});
When('I enter username "testuser"',async()=>{
    const usernameInput = await $('//input[@name="username"]');
     await usernameInput.setValue('Admin');
});
When('I enter password "testpassword"',async()=>{
    const passwordInput = await $('//input[@name="password"]');
     await passwordInput.setValue('admin123');
});
When('I click the login button', async()=>{
    const loginButton = await $('//button[@type="submit"]');
    await loginButton.click();
});
Then('I should be logged in',async()=>{
    const dashboardTitle = await browser.getTitle();
    await expect(dashboardTitle).toEqual('OrangeHRM');

});


