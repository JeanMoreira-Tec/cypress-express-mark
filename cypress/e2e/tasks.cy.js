/// <reference types="cypress" />

describe('tarefas', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('Cadastro', () => {
        it('deve cadastra uma nova tarefa', () => {

            const taskName = 'Estudar Cucumber'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('não deve permitir tarefa duplicada', () => {

            const task = testData.dup

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = {
                name: 'Estudar BDD',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=listItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    context('exclusão', () => {
        it('deve excluir uma tarefa', () => {
            const task = {
                name: 'Estudar Robot',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=listItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})