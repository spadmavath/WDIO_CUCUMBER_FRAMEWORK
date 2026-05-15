import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";
import NewLogin from  "../pages/NewLogin";
Given(`User opens DemoQA text box page`,async()=>{
    await browser.url(process.env.DemoQa_URL); 
    console.log(process.env.URL)
});
Then(`User enters details`,async()=>{
    await NewLogin.username.setValue("Padmavathi");
    await NewLogin.email.setValue("Padmavathi@123");
    await NewLogin.currentAddressInput.setValue("Hyderabad");
    await NewLogin.permanentAddressInput.setValue("Hyderabad");
    
});
When(`User clicks submit button`,async()=>{
    await NewLogin.submitButton.scrollIntoView();
    await NewLogin.submitButton.waitForClickable({
    timeout: 5000
});

    console.log("Scrolled to submit button");
    await NewLogin.submitButton.click();
    
});