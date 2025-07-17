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
    console.log('USER_PASSWORD:', USER_PASSWORD);

    if (!USER_EMAIL || !USER_PASSWORD) {
        throw new Error('Environment variables USER_EMAIL or USER_PASSWORD are not defined');
    }

    await pages.login.accountLogin(USER_EMAIL, USER_PASSWORD);
});

Then(/^I should ignore multi authentication login$/, async () => {
    await pages.dashboard.dismissDashboardIntroIfPresent()
});


Given(/^I am on the Connections page$/, async () => {
    await pages.dashboard.navigateToConnectionsSection()
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

