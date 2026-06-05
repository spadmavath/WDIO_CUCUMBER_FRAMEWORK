import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import Page  from '../pages/Page';
import FlipkartHomePage from '../pages/flipkarthomepage';
import productpage from '../pages/productpage';
setDefaultTimeout(60000);

Given('user launches Flipkart website', async function () 
{
 await  Page.navigateToApplication('https://www.flipkart.com/');
 await expect(browser).toHaveUrl('https://www.flipkart.com/')
});

When('user searches for "iPhone 15"', async function () {
    await FlipkartHomePage.closeLoginPopup();
    console.log('popup closed');
    await browser.pause(2000);
  await  FlipkartHomePage.productsearch('iPhone 15');
  console.log('search started');
});
Then('matching search results should be displayed', async function () {
    await productpage.productsResult();
    console.log('search results displayed');
});
When('user adds the  product to cart', async function () {
    await browser.switchWindow.toString().includes('https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm1e8c7c9f0e5d?pid=MOBGZC2Z6ZQZV6G&lid=LSTMOBGZC2Z6ZQZV6GJY3K5X&marketplace=FLIPKART&q=iphone+15&store=tyy%2F4io&spotlightTagId=BestvalueId_tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=en_9%2Fh%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%2Fqj%2Fz%3D%3D&ppt=sp&ppn=sp&ssid=8g7l7v0m000000001690794441878');
    await productpage.cartbutton.waitForClickable({ timeout: 5000 });
    await productpage.cartbutton.click();

});
