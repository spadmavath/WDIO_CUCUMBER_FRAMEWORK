import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";

Given('Navigating to Webtable', async () => {
    await browser.url("https://demoqa.com/webtables");
    await browser.setTimeout({ implicit: 5000, pageLoad: 5000});
    /** Get the Number of rows */
    let rowcount=await $$("//table[@class='-striped -highlight table table-striped table-bordered table-hover']/tbody/tr")
    expect(rowcount.length).toBe(3);
    console.log("Number of rows in the table: " + rowcount.length);
    /** get the number of columns */
    let colcount=await $$("//table[@class='-striped -highlight table table-striped table-bordered table-hover']/thead/tr/th")
    expect(colcount.length).toBe(7);
    console.log("Number of columns in the table: " + colcount.length);
    //get hole table data
    // let tabledata=await $$("//table[@class='-striped -highlight table table-striped table-bordered table-hover']/tbody/tr/td")
    // for(let i=0;i< await tabledata.length;i++){
    //     let text=await tabledata[i].getText();
    //     console.log(text);
  let arr = [];
  for(let i=0;i< await rowcount.length;i++){
    let persondetails={
        lastname:"",
        firstname:"",
        age:"",
        email:"",
        salary:"",
        department:"",
        Action:""
    }
    
    for(let j=0;j< await colcount.length;j++){
        let celltext=await $(`//table[@class='-striped -highlight table table-striped table-bordered table-hover']/tbody/tr[${i+1}]/td[${j+1}]`).getText();
        if(j===0) persondetails.lastname=celltext;
        else if(j===1) persondetails.firstname=celltext;
        else if(j===2) persondetails.age=celltext;
        else if(j===3) persondetails.email=celltext;
        else if(j===4) persondetails.salary=celltext;
        else if(j===5) persondetails.department=celltext;
        else if(j===6) persondetails.Action=celltext;
    }
    arr.push(persondetails);
    
}
console.log(JSON.stringify(arr));

    /**get a single row based on condition */
    let rowdata=await $$("//table[@class='-striped -highlight table table-striped table-bordered table-hover']/tbody/tr/td[.='Cierra']/..")
    for(let i=0;i< await rowdata.length;i++){
        let text=await rowdata[i].getText();
        console.log(text);
    }
    /** get a single column */
    let columndata=await $$("//table[@class='-striped -highlight table table-striped table-bordered table-hover']/tbody/tr/td[1]")
    for(let i=0;i< await columndata.length;i++){
        let text=await columndata[i].getText();
        console.log(text);
    }
    // /**get single cell data */
    let celldata=await $("//table[@class='-striped -highlight table table-striped table-bordered table-hover']/tbody/tr[1]/td[7]");

});
