import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';


import LoginPage from '../pages/login.page.js';
import Page from '../pages/page.js';
import Dashboard from '../pages/dashboard.page.js';
import { RudderstackAPI } from '../../src/utils.js';

const pages = {
    page: Page,
    login: LoginPage,
    dashboard: Dashboard
};

Given(/^I am on the rudderstack login page$/, async () => {
    //mac machin window size
    await browser.setWindowSize(1700, 1000);
    await pages.login.open();
});

When(/^I enter valid usermail and password credentials$/, async () => {

    const { USER_EMAIL, USER_PASSWORD } = process.env;
    console.log('USER_EMAIL:', USER_EMAIL);

    if (!USER_EMAIL || !USER_PASSWORD) {
        throw new Error('Environment variables USER_EMAIL or USER_PASSWORD are not defined');
    }

    await pages.login.accountLogin(USER_EMAIL, USER_PASSWORD);
});

Then(/^I should ignore multi authentication login$/, async () => {
    const dashboardTextElement = await pages.dashboard.laterText;
    const isVisible = await dashboardTextElement.isDisplayed();

    if (isVisible) {
        await expect(dashboardTextElement).toBeDisplayed();
        await dashboardTextElement.click();
        await pages.dashboard.goToDashboardBtn.click();
        await pages.dashboard.closePopupButton.waitForDisplayed({ timeout: 3000 });
        await pages.dashboard.closePopupButton.click();
    } else {
        throw new Error("Dashboard text element is not displayed or does not contain expected text");
    }
});


Given(/^I am on the Connections page$/, async () => {
    const connectionsHeading = await $("//h3[text()='Connections']");
    const isDisplayed = await connectionsHeading.isDisplayed().catch(() => false);

    if (!isDisplayed) {
        console.log('Navigating to Connections page');
        const subMenuConnection = await pages.dashboard.subMenuConnectionTab;
        await subMenuConnection.click();

        // Wait for the Connections heading to appear
        await $('//h3[text()="Connections"]').waitForDisplayed({ timeout: 2000 });
    } else {
        console.log('Already on Connections page');
    }
});

When(/^I copied the Data Plane URL and Write Key$/, async () => {
    //storing  values in .env file
    const dataPlaneURL = process.env.RUDDERSTACK_DATA_PLANE_URL;
    const writeKey = process.env.RUDDERSTACK_WRITE_KEY;
    console.log(dataPlaneURL, writeKey);
});


//api trigger for event count
Given(/^I trigger the API to get the count of Delivered and Failed events$/, async () => {
    const rudder = new RudderstackAPI();
    await rudder.sendIdentifyEvent();
    await pages.dashboard.triggerAPIForEventCount();
});


Given(/^I am navigate to destination page and click on the destination$/, async () => {
    await pages.dashboard.navigateToDestinationPage();

});

When(/^I click on the event tabs$/, async () => {
    await pages.dashboard.clickOnEventTabs();
});

Then(/^I verify the count of Delivered and Failed events$/, async () => {
    const { deliveredCount, failedCount } = await pages.dashboard.getEventCounts();
    console.log('Delivered Count:', deliveredCount);
    console.log('Failed Count:', failedCount);
    expect(deliveredCount).toBeDefined();
    expect(failedCount).toBeDefined();
});

