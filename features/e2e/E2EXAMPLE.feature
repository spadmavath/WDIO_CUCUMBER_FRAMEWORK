Feature: API Testing

@getUsers
Scenario: Validate GET API
    Given get list of users

@createUser
Scenario: Validate POST API
    Given create a user

@deleteUser
Scenario: Validate DELETE API
    Given delete user