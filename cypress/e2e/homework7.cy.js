/// <reference types="cypress"/>
import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";

describe('Homework 7', () => {
  it('Registration test', () => {
    cy.log('Open website login page');
    cy.visit('https://automationteststore.com/index.php?rt=account/create');
    cy.get('#AccountFrm_firstname').type('Vitalii');
    cy.get('#AccountFrm_lastname').type('Shvets');
    cy.get('#AccountFrm_email').type('tester308625@gmail.com');
    cy.get('#AccountFrm_telephone').type('+380671234567');
    cy.get('#AccountFrm_fax').type('+380661234567');
    cy.get('#AccountFrm_company').type('Apple');
    cy.get('#AccountFrm_address_1').type('10600 N Tantau Ave');
    cy.get('#AccountFrm_address_2').type('Main entrance');
    cy.get('#AccountFrm_city').type('Cupertino');
    cy.get('#AccountFrm_country_id').select('223');
    cy.get('#AccountFrm_zone_id').select('3624');
    cy.get('#AccountFrm_postcode').type('95014');
    cy.get('#AccountFrm_loginname').type('timcook5');
    cy.get('#AccountFrm_password').type('qwerty123');
    cy.get('#AccountFrm_confirm').type('qwerty123');
    cy.get('#AccountFrm_newsletter0').check('0');
    cy.get('#AccountFrm_agree').check('1');
    cy.get('button[title="Continue"]').click();

    cy.location().then(location => {
      expect(location.href).to.be.eq('https://automationteststore.com/index.php?rt=account/success');
    });
    cy.get('span[class="maintext"]', {timeout: 10000}).should('include.text', 'Your Account Has Been Created!');
  })


  it('Authorization test', () => {
    homePage.visit();
    homePage.getLoginOrRegisterButton().click();
    loginPage.submitLoginForm('timcook4', 'qwerty123');

    cy.location().then(location => {
      expect(location.href).to.be.eq('https://automationteststore.com/index.php?rt=account/account');
    });
    cy.get('.menu_text').eq(0).should('include.text', 'Welcome back Vitalii');
  })
  
  
  it('Forgot password test', () => {
    cy.visit('https://automationteststore.com/index.php?rt=account/login');
    cy.get('a').contains('Forgot your password?').click();
    cy.get('#forgottenFrm_loginname').type('timcook');
    cy.get('#forgottenFrm_email').type('tester308619@gmail.com');
    cy.get('button[title="Continue"]').click();

    cy.location().then(location => {
      expect(location.href).to.be.eq('https://automationteststore.com/index.php?rt=account/login');
      });
    cy.get('div[class="alert alert-success"]').should('include.text', 'Success: Password reset');
  })


  it('Forgot login test', () => {
    cy.visit('https://automationteststore.com/index.php?rt=account/login');
    cy.get('a').contains('Forgot your login?').click();
    cy.get('#forgottenFrm_lastname').type('Shvets');
    cy.get('#forgottenFrm_email').type('tester308619@gmail.com');
    cy.get('button[title="Continue"]').click();

    cy.location().then(location => {
      expect(location.href).to.be.eq('https://automationteststore.com/index.php?rt=account/login');
      });
    cy.get('div[class="alert alert-success"]').should('include.text', 'Success: Your login name reminder');
  })
})