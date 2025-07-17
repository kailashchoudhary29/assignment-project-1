const { $, browser } = require('@wdio/globals')
const Page = require('./page');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $('//input[@data-testid="Email"]');
    }

    get inputPassword() {
        return $('//input[@data-testid="Password"]');
    }

    get forgetPassword() {
        return $('//a[normalize-space(text())="Forgot your password?"]');
    }

    get loginBtn() {
        return $('//button//span[text()="Log in"]');
    }

     /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async accountLogin(username, password) {
        await this.inputUsername.waitForExist({ timeout: 3000 });
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginBtn.waitForClickable({ timeout: 5000 }); // wait up to 5 seconds
        await this.loginBtn.click();
        await browser.waitUntil(
            async () => await this.laterText.isDisplayed(),
            {
                timeout: 30000, // Maximum wait time (30 sec)
                timeoutMsg: 'Dashboard later text did not appear after 30 seconds'
            }
        );
    }



    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open();
    }
}

module.exports = new LoginPage();
