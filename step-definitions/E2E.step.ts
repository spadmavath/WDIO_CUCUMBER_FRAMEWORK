import { Given } from "@cucumber/cucumber";
import constants from "../debug/constants.json";
import apiHelper from "../helper/apiHelper";
import { config } from "../config/wdio.test.conf";
import fs from "fs";

Given(
  `create an (.*) with api `,
  async function (endpoint: string) {

    if (!endpoint) {
      throw new Error(
        `Given endpoint ref: ${endpoint} is not valid`
      );
    }

    // 1. Get payload
    let apiEndpoint = "";

    if (endpoint.trim().toUpperCase() === "user") {
      apiEndpoint = constants.swagger.USER;
    }

    if (!apiEndpoint) {
      throw new Error(`Error from constants.json`);
    }

    // 2. Make API call
    let res: any;

    await browser.call(async function () {
      res = await apiHelper.POST(
        config.baseUrl,
        apiEndpoint,
        "",
        constants.swagger.PAYLOAD
      );
    });

    if (res.status !== 200) {
      throw new Error(`FAILED CREATING USER`);
    }

    console.log(
      `RES STATUS: ${JSON.stringify(res.status)}`
    );

    // 3. Store result
    const data = JSON.stringify(res.body);

    const filename =
      `${process.cwd()}/debug/api-result/swaggerUser.json`;

    fs.writeFileSync(filename, data);
  }
);