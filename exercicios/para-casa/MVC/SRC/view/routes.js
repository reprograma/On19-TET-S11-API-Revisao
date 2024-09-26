const express = require ('express')
const routes = express.Router()



const clienteController = require('../controller/cliente')
const contaController = require('../controller/conta')

routes.post ('/clientes', clienteController.create) //DONE
routes.get ('/clientes', clienteController.show) //DONE
routes.get ('/clientes/lista', clienteController.index) //DONE
routes.patch ('/clientes', clienteController.update) //DONE
routes.delete ('/clientes/:id', clienteController.destroy) //DONE

routes.get ('/contas', contaController.show) //DONE
routes.patch ('/contas', contaController.update) //DONE

module.exports = routes