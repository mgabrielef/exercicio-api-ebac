/// <reference types="cypress" />
import contract from '../contracts/users.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response=>{
      return contract.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.listUsers().should((response)=>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let user = 'User' + Math.floor(Math.random() * 1000)
    cy.createUser(user, user + '@test.com', 'test')
      .should((response)=>{
        expect(response.status).equal(201)
        expect(response.body.message).equal("Cadastro realizado com sucesso")
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    let user = 'User ' + Math.floor(Math.random() * 1000)
    cy.createUser(user, user + '@test.com', 'test')
      .should((response)=>{
        expect(response.status).equal(400)
        expect(response.body.email).equal("email deve ser um email válido")
    })
  });

  it.only('Deve editar um usuário previamente cadastrado', () => {
    let user = 'User' + Math.floor(Math.random() * 1000)
    cy.createUser(user, user + '@test.com', 'test')
      .then(response=>{
        let id = response.body._id
        cy.editUser(id, `Edited ${user}`, `edited${user}@test.com`, 'test')
          .should((response)=>{
            expect(response.status).equal(200)
            expect(response.body.message).equal("Registro alterado com sucesso")
          })
      })

  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });


});
