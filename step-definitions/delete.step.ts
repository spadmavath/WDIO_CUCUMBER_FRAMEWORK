import { Given } from "@cucumber/cucumber";
import { expect,browser } from "@wdio/globals";
import apiHelp from "../helper/apiHelp";

Given(`delete user`,async function(){
    const res=await apiHelp.DELETE(
      "https://reqres.in",
      "/api/users/2",
      {
        "x-api-key": "free_user_3EO6sbDcOrsBOeG8I8zFx4nVTov",
        "Content-Type": "application/json"
      }
    )
    console.log(res.status);
    console.log(res.body);
    expect(res.status).toEqual(204);

});
