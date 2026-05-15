Feature: User Login
@login 
 Scenario: Login with data tables
  Given Login into the application as a standard user
  | userType     | username        |
  | standard user| standard_user   |
  | lockout user | locked_out_user |
   
  
 