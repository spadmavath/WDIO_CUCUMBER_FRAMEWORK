import { Given } from "@cucumber/cucumber";
import { browser, expect } from "@wdio/globals";
import apiHelp from "../helper/apiHelp";

Given(
  "get list of users",
  async function () {

    const res = await apiHelp.GET(
      "https://reqres.in",
      "/api/users?page=2",
      {
        "x-api-key": "free_user_3EO6sbDcOrsBOeG8I8zFx4nVTov",
        "Content-Type": "application/json"
      }
    );

    console.log(res.body);

    expect(res.status).toEqual(200);
    expect(res.body.data.length)
      .toBeGreaterThan(0);
  }
);