const express = require('express')
const clientesController = require('./controller/clientes')
const contasController = require('./controller/contas')
const rotas = express.Router()

rotas.post('/clientes/add', clientesController.criaCliente)
/*routes.post('/clientes', clientesController.show)
routes.post('/clientes', clientesController.index)
routes.post('/clientes', clientesController.update)
routes.post('/clientes', clientesController.destroy)
routes.post('/contas', contasController.create)
routes.post('/contas', contasController.show)
routes.post('/contas', contasController.index)
routes.post('/contas', contasController.update)
routes.post('/contas', contasController.destroy)*/

module.exports = rotas