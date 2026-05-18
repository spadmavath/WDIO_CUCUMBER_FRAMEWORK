Feature: User Login
@login 
 Scenario:<testID>Login with data tables
  Given Login into the application as a standard user
  | userType     | username        |
  | standard user| standard_user   |
  | lockout user | locked_out_user |
    When user clicks on login button
    Examples:
     | testID |
     | TC001  |
   
  
 