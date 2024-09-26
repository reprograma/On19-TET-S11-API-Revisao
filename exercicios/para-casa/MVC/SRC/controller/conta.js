const listaClientes = require('../model/contas-clientes.json')

const random = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

const create = (req, res) => {
    const {conta} = req.body
    const contaNova = {
        "numero": random(1, 999999), 
        "tipo": conta.tipo,
        "saldo": 0,
        "data_criacao": new Date()
    }
    return contaNova
}; // DONE

const show = (req, res) => {    
    const contaFiltro = req.query.conta
    const saldoFiltro = req.query.saldo
    //const criacaoFiltro = req.query.criacao - não sei como ler data

    const clientesFiltrados = listaClientes.filter ((cliente, index) => {
        if (contaFiltro){
            if (cliente.conta.tipo.toLowerCase().includes(contaFiltro.toLowerCase())) return cliente
        }
        if (cliente.conta.saldo <= saldoFiltro){
            if (cliente.conta.saldo <= saldoFiltro) return cliente
        }
    })   
    if (clientesFiltrados.length == 0){
        return res.status(404).json({message: "Nenhuma conta encontrada com o filtro usado. Para a lista completa, use o endereço: '/clientes/lista'"})
}
else return res.json(clientesFiltrados)
}; // DONE

const index = (req, res) => {

};

const update = (req, res) => {
    const clienteID = req.params.id
    const { operacao } = req.body

    const contaExiste = listaClientes.find((conta, index) => conta.id == clienteID)
    if (contaExiste){
        listaClientes.map ((conta, index) => {
            if (conta.id == clienteID){
                if (operacao >= 0){
                    listaClientes[index].conta.saldo += operacao
                    return res.status(202).json({message:`Saldo atual é de R$${listaClientes[index].conta.saldo}`})
                }
                else {
                    if (conta.conta.saldo < Math.abs(operacao)){
                    return res.json({message:'Saldo insuficiciente para o pagamento'})
                    }
                    else {
                        listaClientes[index].conta.saldo += operacao
                        return res.status (202).json({message:`Conta paga. Saldo restante: R$${listaClientes[index].conta.saldo}`})
                    }
                }
            }
        })
    }
    if (! contaExiste){
        return res.status (404).json({message: 'Conta não localizada'})
    }
}; // DONE

const destroy = (req, res) => {};

module.exports = {
    create,
    show,
    index,
    update,
    destroy
}