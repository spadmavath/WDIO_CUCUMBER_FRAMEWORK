Feature: CURA Healthcare Service - Appointment Booking

  As a user of CURA Healthcare
  I want to navigate to the appointment booking page
  So that I can schedule a medical appointment

  Background:
    Given I navigate to the CURA Healthcare homepage

  # @smoke @appointment
  # Scenario: Navigate to Make Appointment page
  #   When I click the "Make Appointment" button
  #   Then I should be redirected to the login page

 @navigation
  Scenario: Verify homepage loads correctly
    Then the homepage title should be "CURA Healthcare Service"
    And the "Make Appointment" button should be visible
