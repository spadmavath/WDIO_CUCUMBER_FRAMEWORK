@smoke
Feature: Sauce Demo Application - End to End Test Suite

  Background:
    Given User launches the application
  # =============================================
  # LOGIN
  # =============================================
  @Login
  Scenario Outline: Verify login with valid and invalid credentials - <username>
    When User enters username "<username>"
    And User enters password "<password>"
    And User clicks on Login button
    Then User should see logout button

    Examples:
      | username                    | password    |
      | user_j19yr71x6t@gmail.com   | Test@12345  |
      | user_ozcfioxz8s@gmail.com   | Test@123456 |
      | user_j19yr71x6t@gmil.com    | Test@12345  |
      | user_j19yr71x6t@gmil.com    | Test@123457 |

  # =============================================
  # SIGNUP
  # =============================================
  @signup
  Scenario: Create a new account with dynamic data
    When User enters dynamic registration details
    And User clicks Create Account button
    Then Account should be created successfully

  # =============================================
  # PRODUCT SEARCH AND PRICE VALIDATION
  # =============================================
  @Search
  Scenario: Verify products with price greater than 50
    When User searches for "jacket"
    Then User should find products with price greater than 50

  # =============================================
  # PRODUCT COUNT VERIFICATION
  # =============================================
  @productVerify
  Scenario: Verify product count matches search results
    When User searches for "jacket"
    Then the displayed result count should match the number of products shown on the products page

  # =============================================
  # SOCIAL MEDIA LINKS
  # =============================================
  @SocialLinks
  Scenario Outline: Verify social media links - <socialLink>
    When User clicks on social link "<socialLink>"
    Then User should be navigated to the respective social media page
    And User closes the child window and switches back to parent window

    Examples:
      | socialLink |
      | Facebook   |
      | Twitter    |
      | Instagram  |
      | Pinterest  |
      | RSS        |