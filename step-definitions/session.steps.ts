import {
    Given,
    Then
} from '@cucumber/cucumber';

import { expect } from '@wdio/globals';
import SessionManager from '../utils/sessionManager';

Given(
'user restores previous session',
async function () {

    await SessionManager.restoreSession();
});

Then(
'user should login automatically',
async function () {

    await browser.pause(5000);

    const url = await browser.getUrl();
    await expect(url).toContain('lightning');
});