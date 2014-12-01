Feature: Example feature
  As a developer
  I should learn new technologies
  Such as cucumber
  So I should start with simple example

  Scenario: Home page title
    Given I'm on the home page
    Then I should see "Industry Week" in the title of the page

  Scenario: Home page alert
    Given I'm on the home page
    When I click on "#example-view" alert close button
    Then Alert should disappear
