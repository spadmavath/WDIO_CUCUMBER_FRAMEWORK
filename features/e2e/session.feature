Feature: Reuse Session

  Scenario: Login using saved session
    Given user restores previous session
    Then user should login automatically