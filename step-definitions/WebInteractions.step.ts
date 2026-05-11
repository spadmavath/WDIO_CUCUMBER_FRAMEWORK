import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
Given('A web page is opened',async()=>{
    await browser.url("https://the-internet.herokuapp.com/");
    await browser.maximizeWindow();
    await browser.setTimeout({implicit:10000, pageLoad:10000});
    await expect(browser).toHaveTitle("The Internet");
});
When('I perform web interactions',async()=>{


  /**
   * Input actions
   */
// await $('=Inputs').click();
// let input=12345;
//  let sendinput=input.toString();
//  const InputBox=await $("input[type='number']");
//  for(let i=0;i<sendinput.length;i++){
//    const string=sendinput.charAt(i);
//    await browser.pause(1000);
//    await browser.keys(string);
//  }
/**
 * dropdown
 *a. assert default option is selcted
  *b.select option by visible text,attribute and index
  *c. get the  list of options

 */
//await $('=Dropdown').click();
//await expect($('#dropdown')).toBePresent();
//a. assert default option is selcted
// let ele=await $('//select/option[@selected="selected"]');
// let text=await ele.getText();
// expect(text).toEqual("Please select an option");

// await browser.debug()

//b.select a specific option 
//let dropdown=await $('#dropdown');
//await dropdown.selectByIndex(1);
//await dropdown.selectByVisibleText("Option 2");
//await dropdown.selectByAttribute("value","1");


//c. get the  list of options
// await $('a[href="/checkboxes"]').click();
// let ele=await $('//form[@id="checkboxes"]/input[2]');
// if(!await ele.isSelected()){
//    await ele.click(); 
//  }
// let ischecked=ele.isSelected();
// expect(ischecked).toBe(true);
 //await browser.debug();


 /**
  * basic scrolling
  * element methods()
  * scrollIntoView()
  */

 await $('a[target="_blank"]').scrollIntoView();
});
