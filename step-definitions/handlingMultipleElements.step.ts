import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import { error } from "console";
import { InvalidatedProjectKind } from "typescript";
Given('login in to inventory web app',async()=>{
   // console.log(`test username:${process.env.TEST_USERNAME}`);
    await browser.url("https://www.saucedemo.com/");
    await browser.setTimeout({ implicit: 5000 ,pageLoad: 10000});
    const usernameInput=await $("#user-name");
    const passwordInput=await $("#password");
    const loginButton=await $("#login-button");
    await usernameInput.setValue(process.env.TEST_USERNAME);
    await passwordInput.setValue(process.env.TEST_PASSWORD);
    await loginButton.click();
});
When(/^inventory page should list (.*)$/, async function (noOfItems) {
if(!noOfItems) throw error(`Invalid number provided: ${noOfItems}`);
let elearry=await $$(".inventory_item_name ")
//expect(elearry.length).to.equal(noOfItems)/=== compares it value and type
expect(elearry.length).toBe(parseInt(noOfItems))

});
/**
 * steps:
 * 1. get  the price list
 * 2.convert the price string into a number
 * 3.validate if any price <=0
 */
Then('validate all products have valid price', async()=>{
    // 1. get  the price list
let priceArray=await $$(".inventory_item_price");
let pricelist=[];
for(let i=0;i< await priceArray.length ;i++){
    let priceText=await priceArray[i].getText();
    pricelist.push(priceText);

}
console.log(`Price list: ${pricelist}`);
/**2. convert the price string into a number// */
pricelist=pricelist.map(ele =>parseInt+(ele.replace("$","")));
console.log(`Price list after conversion: ${pricelist}`);
/**3. validate if any price <=0 */
let invalidprice=pricelist.filter(price =>price<=0);
expect(invalidprice.length).toBe(0);

});