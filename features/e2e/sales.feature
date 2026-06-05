Feature: Salesforce Login
@smoke
  Scenario: Login and Save Session
    Given user launches Salesforce website
    When user logs into Salesforce
    Then save logged sessions