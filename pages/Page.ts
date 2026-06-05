export default class Page {

  async navigateToApplication(path: string) {
    await browser.url(path);
    await browser.maximizeWindow();
  }

  async click(ele) {
    await ele.waitForClickable({ timeout: 5000 });
    await ele.click();
  }

  async typeInto(ele, text: string) {
    await ele.waitForDisplayed({ timeout: 10000 });
    await ele.setValue(text);
  }

  async gettext(ele) {
    return await ele.getText();
  }
}

 