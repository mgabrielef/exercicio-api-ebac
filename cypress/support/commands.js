Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('listUsers' , () =>{
    cy.request({
        method: 'GET',
        url: 'usuarios',
    })
 })

 Cypress.Commands.add('createUser', (name, email, password)=>{
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body:{
            "nome": name,
            "email": email,
            "password": password,
            "administrador": "true"
        },
        failOnStatusCode: false
    })
 })