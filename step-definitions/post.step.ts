import { Given } from "@cucumber/cucumber";
import ApiHelp from '../helper/apiHelp';
import { browser, expect } from "@wdio/globals";
import apiHelp from "../helper/apiHelp";
Given(`create a user`,async function(){
    const payload = {
      name: "Padmavathi",
      job: "QA Engineer"
    };
    const res= await apiHelp.POST(
        "https://reqres.in",
      "/api/users",
      {
        "x-api-key": "free_user_3EO6sbDcOrsBOeG8I8zFx4nVTov",
        "Content-Type": "application/json"
      },
      payload

    );
    console.log(res.body);
    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual("Padmavathi");
    expect(res.body.job).toEqual("QA Engineer");

})