/// <reference types="cypress"/>
import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import user from '../fixtures/user.json';
import {faker} from '@faker-js/faker';
import {login} from '../support/helper.js';

user.username = faker.internet.userName();
user.firstName = faker.person.firstName('male');
user.lastName = faker.person.lastName();
user.postCode = faker.location.zipCode('#####');
user.addressLine1 = faker.location.street();
user.city = faker.location.city();
user.email = faker.internet.email();
user.password = faker.internet.password({length: 20});


describe('Homework 7', () => {
  it('Registration test', () => {
    cy.log('Open website login page');
    cy.visit('/');
    cy.get('#customer_menu_top').click();    
    cy.get('[title="Continue"]').click();    
    cy.get('#AccountFrm_firstname').type(user.firstName);
    cy.get('#AccountFrm_lastname').type(user.lastName);
    cy.get('#AccountFrm_email').type(user.email);
    cy.get('#AccountFrm_telephone').type(user.phoneNumber);
    cy.get('#AccountFrm_fax').type(user.fax);
    cy.get('#AccountFrm_company').type(user.company);
    cy.get('#AccountFrm_address_1').type(user.addressLine1);
    cy.get('#AccountFrm_address_2').type(user.addressLine2);
    cy.get('#AccountFrm_city').type(user.city);
    cy.get('#AccountFrm_country_id').select(user.countryId);
    cy.get('#AccountFrm_zone_id').select(user.zone);
    cy.get('#AccountFrm_postcode').type(user.postCode);
    cy.get('#AccountFrm_loginname').type(user.username);
    cy.get('#AccountFrm_password').type(user.password);
    cy.get('#AccountFrm_confirm').type(user.password);
    cy.get('#AccountFrm_newsletter0').check('0');
    cy.get('#AccountFrm_agree').check('1');
    cy.get('button[title="Continue"]').click();
    
    cy.clearAllCookies();
    cy.get('span[class="maintext"]', {timeout: 10000}).should('include.text', 'Your Account Has Been Created!');

    login(user);
  })


  it('Authorization test', {retries: 2}, () => {
    homePage.visit();
    homePage.getLoginOrRegisterButton().click();
    loginPage.submitLoginForm(user.username, user.password);

    cy.get('.menu_text').eq(0).should('include.text', 'Welcome back')
  })
})