Feature: RudderStack End-to-End Flow Automation


  Background:
    Given I am on the rudderstack login page

  Scenario: User logs into RudderStack successfully
    When I enter valid usermail and password credentials
    Then I should ignore multi authentication login

  Scenario: User abel to copy Data Plane URL and Write Key
    Given I am on the Connections page
    When I copied the Data Plane URL and Write Key
  
  Scenario: User trigger api to get the count of Delivered and Failed events
    Given I trigger the API to get the count of Delivered and Failed events

  Scenario: User navigate to destination page and click on the destination
    Given I am navigate to destination page and click on the destination
    When I click on the event tabs
    Then I verify the count of Delivered and Failed events


