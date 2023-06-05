/// <reference types="cypress"/>
import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";

describe('Homework 7', () => {

    it('Purchase test', () => {
        homePage.visit();
        homePage.getLoginOrRegisterButton().click();
        loginPage.submitLoginForm('timcook4', 'qwerty123');
    
        cy.location().then(location => {
          expect(location.href).to.be.eq('https://automationteststore.com/index.php?rt=account/account');
        });
        cy.get('.menu_text').eq(0).should('include.text', 'Welcome back Vitalii');

        cy.get('#categorymenu').contains('Skincare').click();
        cy.get('[class="thumbnails row"]').contains('Eyes').click();
        cy.get('[title="Eye master"]').click();
        cy.get('[class="productpagecart"]').click();
        cy.get('#cart_quantity96').clear().type(2);
        cy.get('#cart_update').click();
        cy.get('#cart_checkout1').click();
        cy.get('#checkout_btn').click();

        cy.get('span[class="maintext"]').should('include.text', ' Your Order Has Been Processed!');
        cy.location().then(location => {
            expect(location.href).to.be.eq('https://automationteststore.com/index.php?rt=checkout/success');
          });
      })
})