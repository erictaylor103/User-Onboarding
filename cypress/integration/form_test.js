import { v4 as uuid } from 'uuid'


const existingUser = 'John'
const name = uuid().slice(0, 5)


    describe('User Onboarding Form', function(){
        
        
        it('can navigate the website locally', function(){
            cy.visit('')
            cy.url().should('include', 'localhost')
            
        })

        it('Checks if the Submit button is disabled', function(){
            cy.get('button').should('be.disabled')
        })

        it('Gets the checkbox and sets it to checked', function(){
            cy.get('[type="checkbox"]').check()
        })

        it('Gets the name input field and adds John to it', function(){
            cy.get('input[name="name"]').type(name)
        })

        it('Checks (assertion) if the name input is the same as Michael', function(){
            cy.get('input[name="name"]')
                .should('have.value', name)
        })

        it('Gets the email input and types an email address in it', function(){
            cy.get('input[name="email"]').type('mike@gmail.com')
        })

        it('Gets the password input field and adds a password to it', function(){
            cy.get('input[name="password"]').type("mike12345")
        })

        it('Gets the checkbox and checks if user can check the checkbox', function(){
            cy.get('input[name="terms"]').should('be.checked')
        })


        it('Can submit the new user inputs to the database', function(){
            cy.get('input[name="name"]')                
                .should('have.value', name)

            cy.get('input[name=email]')
                .should('have.value', 'mike@gmail.com')

            cy.get('input[name="password"]')
                .should('have.value', 'mike12345')
            
            cy.get('input[name="terms"]')
                .should('be.checked')

            cy.contains('Submit')
            .click()
            
        })




    })

    