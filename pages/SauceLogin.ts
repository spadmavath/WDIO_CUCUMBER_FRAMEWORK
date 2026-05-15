class LoginPage {

    // Locators

    get usernameInput() {
        return $("#user-name");
    }

    get passwordInput() {
        return $("#password");
    }

    get loginButton() {
        return $("#login-button");
    }

    // Actions

    async openApplication() {

        await browser.url("https://www.saucedemo.com/");
    }

    async enterUsername(username: string) {

        await this.usernameInput.setValue(username);
    }

    async enterPassword(password: string) {

        await this.passwordInput.setValue(password);
    }

    async clickLoginButton() {

        await this.loginButton.click();
    }

    async login(username: string, password: string) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLoginButton();
    }
}

export default new LoginPage();