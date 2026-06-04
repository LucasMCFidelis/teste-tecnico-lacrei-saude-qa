# cypress/e2e/duckduckgo.feature
Feature: duckduckgo.com
    @smoke
    Scenario: visiting the frontpage
        When I visit duckduckgo.com
        Then I should see a search bar
    
    @regression
    Scenario: visiting the frontpage
        When I visit duckduckgo.com
        Then I should see a search bar