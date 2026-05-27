import { Given } from "@cucumber/cucumber";
import {  browser, expect } from "@wdio/globals";
import apiHelp from "../helper/apiHelp";

Given(
  "get list of users",
  async function () {

    const res = await apiHelp.GET(
        "https://reqres.in",
        "/api/users?page=2",
        {}
      );

    console.log(res.body);

    expect(res.status).toEqual(200);
    expect(res.body.data.length)
      .toBeGreaterThan(0);
    });
