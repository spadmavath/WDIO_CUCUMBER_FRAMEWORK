import page from "./Page";
class LoginPagesales extends page {
    constructor() {
    super();
  }
    
    get username() {
        return $('#username');
    }

    get password() {
        return $('#password');
    }

    get loginButton() {
        return $('#Login');
    }

    get homePageElement() {
        return $('.slds-global-header');
    }
    

    async login(username: string, password: string) {

        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.loginButton.click();
        
    }
}

export default new LoginPagesales();