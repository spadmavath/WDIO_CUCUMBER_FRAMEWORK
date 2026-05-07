import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { $, browser, expect } from "@wdio/globals";
// ─── Given Steps ─────────────────────────────────────────────────────────────

Given('I navigate to the CURA Healthcare homepage', async () => {
  await HomePage.open();
});

// ─── When Steps ──────────────────────────────────────────────────────────────

When('I click the {string} button', async (buttonName: string) => {
  if (buttonName === 'Make Appointment') {
    await HomePage.clickMakeAppointment();
  } else {
    throw new Error(`Button "${buttonName}" is not mapped in step definitions.`);
  }
});

// ─── Then Steps ──────────────────────────────────────────────────────────────

Then('I should be redirected to the login page', async () => {
  const isLoginVisible = await LoginPage.isLoginPageDisplayed();
  expect(isLoginVisible).toBe(true);

  const currentUrl = await LoginPage.getCurrentUrl();
  expect(currentUrl).toContain('profile');
});

Then('the homepage title should be {string}', async (expectedTitle: string) => {
  const actualTitle = await HomePage.getPageTitle();
  expect(actualTitle).toBe(expectedTitle);
});

Then('the {string} button should be visible', async (buttonName: string) => {
  if (buttonName === 'Make Appointment') {
    const isVisible = await HomePage.isMakeAppointmentButtonVisible();
    expect(isVisible).toBe(true);
  } else {
    throw new Error(`Button "${buttonName}" is not mapped in step definitions.`);
  }
});
