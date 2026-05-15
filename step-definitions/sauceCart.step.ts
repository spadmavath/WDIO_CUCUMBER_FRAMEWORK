import { Given, When, Then } from "@cucumber/cucumber";

import { expect } from "@wdio/globals";

import LoginPage from "../pages/SauceLogin";
import InventoryPage from "../pages/InventoryPage";

Given('User opens SauceDemo application', async () => {

    await LoginPage.openApplication();
});

When('User logs in with valid credentials', async () => {

    await LoginPage.login(
        "standard_user",
        "secret_sauce"
    );
});

Then('Inventory page should display', async () => {

    await expect(
        await InventoryPage.isInventoryPageDisplayed()
    ).toBe(true);
});