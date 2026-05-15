Feature: SauceDemo Login
  @login
  Scenario: Successful login
    Given User opens SauceDemo application
    When User logs in with valid credentials
    Then Inventory page should display
 