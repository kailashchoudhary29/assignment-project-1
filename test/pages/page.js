const { browser } = require('@wdio/globals')


/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open () {
        return browser.url(`${process.env.BASE_URL}`)
    }

    get laterText() {
        return $('//a[@href="/addmfalater"]');
    }
}
