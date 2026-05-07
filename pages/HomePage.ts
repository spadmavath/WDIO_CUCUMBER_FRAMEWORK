/**
 * Page Object Model - CURA Healthcare Homepage
 */
class HomePage {

  get makeAppointmentButton() {
    return $('a#btn-make-appointment')
  }

  async open(): Promise<void> {
    await browser.url('https://katalon-demo-cura.herokuapp.com/')
    await browser.waitUntil(
      async () => (await browser.getTitle()) !== '',
      { timeout: 10000, timeoutMsg: 'Homepage did not load within 10 seconds' }
    )
  }

  async clickMakeAppointment(): Promise<void> {
    await this.makeAppointmentButton.waitForDisplayed({ timeout: 8000 })
    await this.makeAppointmentButton.waitForClickable({ timeout: 8000 })
    await this.makeAppointmentButton.click()
  }

  async getPageTitle(): Promise<string> {
    return await browser.getTitle()
  }

  async isMakeAppointmentButtonVisible(): Promise<boolean> {
    return await this.makeAppointmentButton.isDisplayed()
  }
}

export default new HomePage()
