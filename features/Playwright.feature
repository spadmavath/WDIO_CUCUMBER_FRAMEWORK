Feature: Login Functionality

@validLogin
Scenario: Verify successful login with valid credentials
  Given user is on the login page
  When user enters valid username and password
  And clicks on the login button
  Then user should be redirected logout page