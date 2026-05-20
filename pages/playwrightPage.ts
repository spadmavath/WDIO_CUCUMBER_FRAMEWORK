import Page from "./Page";
class playwrightPage extends Page {
  constructor() {
    super();
  }
  Username = $("input[name=username]");
  Password = $("input[name=password]");
  LoginButton = $(".btn");
  async enterUsername(username: string) {
    try {
      await this.typeInto(this.Username, username);
    } catch (error) {
      error.message = `Failed to enter username: ${error.message}`;
      console.error("Error occurred while entering username:", error);
    }
  }

  async enterPassword(password: string) {
    try {
      await this.typeInto(this.Password, password);
    } catch (error) {
      error.message = `Failed to enter password: ${error.message}`;
      console.error("Error occurred while entering password:", error);
    }
  }

  async clickLoginButton() {
    await this.click(this.LoginButton);
  }
}
export default new playwrightPage();
