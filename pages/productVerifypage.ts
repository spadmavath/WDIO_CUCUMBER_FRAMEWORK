class ProductVerify {
  search = $("//input[@id='search-field']");

  resultcount = $('//section[@class="product-grid"]//h3');
  productList = $$('//a[@class="animated fadeInUpBig"]');

  async searchProduct(productName: string) {
    await this.search.waitForDisplayed({ timeout: 10000 });
    await this.search.clearValue();
    await this.search.setValue(productName);
    await browser.keys('Enter');
    await browser.pause(2000); 
  }

  async getDisplayedResultCount(): Promise<number> {
  const countText = await this.resultcount.getText();
  const match = countText.match(/\d+/);
  return match ? parseInt(match[0]) : 0;



  }

  async getActualProductCount(): Promise<number> {
  // Simply counts how many product elements are on the page
  const products = await this.productList;
  return products.length;
}
}

export default new ProductVerify();