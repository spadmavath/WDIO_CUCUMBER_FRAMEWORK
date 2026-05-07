/**
 * Page Object Model - CURA Healthcare Login Page
 */
class LoginPage {

  get loginButton() {
    return $('button#btn-login')
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    await this.loginButton.waitForDisplayed({ timeout: 8000 })
    return await this.loginButton.isDisplayed()
  }

  async getCurrentUrl(): Promise<string> {
    return await browser.getUrl()
  }
}

export default new LoginPage()
