import page from './Page';
class productpage extends page {
    cartbutton = $('//div[@class="css-g5y9jx"]//*[name()="svg"]');
  async  productsResult() {
    const products =await $$('.jIjQ8S');
    for (const element of products) {
      const text = await element.getText();
      if (text === 'Apple iPhone 15 (Black, 128 GB)') {
        await element.waitForClickable({ timeout: 5000 });
        await element.click();
        console.log('Product found and clicked');
        return; 
      }
    }

    console.log('Product not found');
    
  }
  

}

export default new productpage();