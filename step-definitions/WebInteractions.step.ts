import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
Given('A web page is opened',async()=>{
    await browser.url("https://the-internet.herokuapp.com/");
    await browser.maximizeWindow();
    await browser.setTimeout({implicit:10000, pageLoad:10000});
    await expect(browser).toHaveTitle("The Internet");
});
When('I perform web interactions',async()=>{
await $('=Inputs').click();
let input=12345;
 let sendinput=input.toString();
 const InputBox=await $("input[type='number']");
 for(let i=0;i<sendinput.length;i++){
   const string=sendinput.charAt(i);
   await browser.pause(1000);
   await browser.keys(string);
 }
});
