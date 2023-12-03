describe('Testando sites no cypress', () => {

  it('Testando Cadastro', () => {
    cadastro()
  })

  it('Testando Login', () => {
    cy.visit('https://www.demoblaze.com/index.html')
    cy.get('#login2').click()
    cy.wait(2000)
    cy.get('#loginpassword').type('asa')
    cy.get('#loginusername').type('asa')
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.get('#nameofuser').should('contain.text', 'Welcome asa')
  })

  it('Testando recuperacao de email invalido', () => {
    cy.visit('https://the-internet.herokuapp.com/forgot_password')
    cy.get('#email').type('email')
    cy.get('#form_submit').click()
    cy.get('h1').should('contain.text', 'Internal Server Error')
  })

})

function cadastro(){
  let minutos = new Date().getMinutes().toString();
  let segundos = new Date().getSeconds().toString();

  let user = minutos + segundos + 'S206user'
  let senha = minutos + segundos + 'S206senha'
  let user_info = [user , senha]

  cy.visit('https://www.demoblaze.com/index.html')
  cy.get('#signin2').click()
  cy.get('#sign-username').type(user)
  cy.get('#sign-password').type(senha)
  cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
  cy.request('https://www.demoblaze.com/index.html').its('status').should('eq', 200)

  return user_info
}