import page from './Page';
class FlipkartHomePage extends page {
    // searchBox = '#container input[name="q"]';
    // searchButton = '#container button[type="submit"]';
    get searchBox() {
    return $('div[class*="search"] input'); // Example - update with actual selector
}
    get searchButton() {
        return $('#container button[type="submit"]');
    }
    get closePopupBtn() {
    return $("//span[text()='✕']");
}

   async productsearch(product: string) {
    await this.searchBox.waitForDisplayed({
        timeout: 15000
    });

    await this.searchBox.setValue(product);
    await browser.keys('Enter');
}

   async closeLoginPopup() {
    const popup = await this.closePopupBtn;

    if (await popup.isDisplayed()) {
        await popup.waitForClickable({ timeout: 10000 });
        await popup.click();
    }
}

}
export default new FlipkartHomePage();