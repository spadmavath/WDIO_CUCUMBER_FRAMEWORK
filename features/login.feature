Feature: Login Functionality 
 
 Scenario: Successful Login
  Given I open the login page
   When I enter username "testuser"
   And I enter password "testpassword"
   And I click the login button
   Then I should be logged in
   