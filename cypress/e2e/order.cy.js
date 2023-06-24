/// <reference types="cypress"/>

import user from '../fixtures.user.json';
import {login, findNewProd, findProduct} from '../support/helper.js';

it('Order', () => {
    login(user);

    cy.get('#filter_keyword')
    .type('i')
    .closest("form")
    .submit();

    findProduct('Guccy Guilty');

    cy.get('.productpagecart').click();
    cy.get('#cart_checkout1').click();
    cy.get('#checkout_btn').click();
    cy.get('.contentpanel').should('contain', "Thank you for shopping with us!");

})