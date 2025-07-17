const { $ } = require('@wdio/globals')
const Page = require('./page');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class Dashboard extends Page {
    /**
     * define selectors using getter methods
     */

    get goToDashboardBtn() {
        return $('//button//span[text()="Go to dashboard"]');
    }


    get subMenuConnectionTab() {
        return $('//a[@data-testid="sub-menu-connections"]');
    }

    get subMenuSource() {
        return $('//a[@data-testid="sub-menu-sources"]');
    }

    get subMenuDestination() {
        return $('//a[@data-testid="sub-menu-destinations"]');
    }

    get subMenuTransformation() {
        return $('//a[@data-testid="sub-menu-transformations"]');
    }
    get deliveredEventsCount() {
        return $('//span[text()="Delivered"]/following-sibling::div/h2/span');
    }

    get failedEventsCount() {
        return $('//span[text()="Failed"]/following-sibling::div/h2/span');
    }

    get eventTabs() {
        return $('//div[@data-node-key="Events"]');
    }

    get closePopupButton() {
        return $('//button[@data-action="close"]');
    }

    get tabOnDestination() {
        return $("//div[@class='ant-table-body']");
    }
    get destinationText() {
        return $("//h3[text()='Destinations']");
    }

    get connectionText() {
        return $("//h3[text()='Connections']");
    }

    triggerAPIForEventCount() {
        // Implementation for triggering API to get event counts

    }


    async navigateToDestinationPage() {
        await this.subMenuDestination.click();
        await this.destinationText.isDisplayed()
        await this.tabOnDestination.click();

    }

    async clickOnEventTabs() {
        // wait element clickable
        await this.eventTabs.waitForClickable({ timeout: 2000 });
        await this.eventTabs.click();
    }

    async getEventCounts() {
        const deliveredCount = await this.deliveredEventsCount.getText();
        const failedCount = await this.failedEventsCount.getText();
        return { deliveredCount, failedCount };
    }

    async navigateToConnectionsSection() {
        const connectionsHeading = await this.connectionText;
        const isDisplayed = await connectionsHeading.isDisplayed().catch(() => false);

        if (!isDisplayed) {
            console.log('Navigating to Connections page');
            const subMenuConnection = await this.subMenuConnectionTab;
            await subMenuConnection.click();

            // Wait for the Connections heading to appear
            await browser.waitUntil(
                async () => await connectionsHeading.isDisplayed(),
                {
                    timeout: 10000,
                    timeoutMsg: '"Connections" heading was not displayed within 10 seconds'
                }
            );
        } else {
            console.log('Already on Connections page');
        }
    }

    async dismissDashboardIntroIfPresent() {
        const dashboardTextElement = await this.laterText;
        const isVisible = await dashboardTextElement.isDisplayed();

        if (isVisible) {
            await expect(dashboardTextElement).toBeDisplayed();
            await dashboardTextElement.click();
            await this.goToDashboardBtn.click();
            await this.closePopupButton.waitForDisplayed({ timeout: 2000 });
            await this.closePopupButton.click();

        } else {
            throw new Error("Dashboard text element is not displayed or does not contain expected text");
        }
    }

}

module.exports = new Dashboard();
