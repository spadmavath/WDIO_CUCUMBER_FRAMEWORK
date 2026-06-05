Feature: Flipkart End To End Shopping Flow

@flipkartE2E
Scenario: Verify guest user can search and add product to cart successfully

  Given user launches Flipkart website
  Then user should see the homepage
  When user searches for "iPhone 15"
  Then matching search results should be displayed
  When user adds the  product to cart
#   Then product should be added to cart successfully
