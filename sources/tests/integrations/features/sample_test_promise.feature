Feature: Sample test

     This is a feature example

        Scenario: Validate user details
            Given I send a message "THIS IS A MESSAGE!"
             When the message is validated
             Then should respond with the User details

        Scenario: Validate new user creation
             Then should create a new User

        Scenario: Validate User data update
             Then should update the current user with all data

        Scenario: Validate the update of some user data
             Then should update the current user with some data

        Scenario: Validate the user deletion
             Then should delete a user