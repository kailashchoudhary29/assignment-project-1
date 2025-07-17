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
        // return $('//div[@role="tab"][text()="Events"]');
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

}

module.exports = new Dashboard();
