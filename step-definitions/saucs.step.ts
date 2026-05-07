import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";

Given('I open the SauceDemo website',async()=>{
 await browser.url("https://www.saucedemo.com/");
 await browser.maximizeWindow();
 await expect(browser).toHaveTitle("Swag Labs");
});
When('I login with valid credentials',async()=>{
    await $('input[id=user-name]').setValue("standard_user");
    await $('input[id=password]').setValue("secret_sauce");
    await $('#login-button').click();
});
When('I add a product to the cart',async()=>{
    const cartbutton=await $('#add-to-cart-sauce-labs-backpack');
    await cartbutton.click();
    
});
When('I open the cart',async()=>{
    await $('#shopping_cart_container').click();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");

});
Then('the product should be visible in the cart',async()=>{
    const product = await $('.inventory_item_name');
    await expect(product).toHaveText('Sauce Labs Backpack');

});
When('I logout from the application',async()=>{
 await $('.bm-burger-button').click();
  const logoutbutton=await $('#logout_sidebar_link');
    await logoutbutton.click();
});
Then('I should be redirected to login page',async()=>{
 await expect(browser).toHaveUrl("https://www.saucedemo.com/");
});
