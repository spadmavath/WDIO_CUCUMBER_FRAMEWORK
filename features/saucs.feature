Feature: Sauce Demo website
 Scenario: Login and add product to cart
    Given I open the SauceDemo website
    When I login with valid credentials
    And I add a product to the cart
    And I open the cart
    Then the product should be visible in the cart
    When I logout from the application
    Then I should be redirected to login page