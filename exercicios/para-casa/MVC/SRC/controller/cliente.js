const listaClientes = require('../model/contas-clientes.json')

const { v4: uuidv4 } = require ('uuid')

const contaController = require('./conta')

const create = (req, res) => {
    const {nome_cliente, cpf_cliente, data_nascimento, conta} = req.body

    const faltaAlgo = []
    if (! nome_cliente) faltaAlgo.push('nome_cliente')
    if (! cpf_cliente) faltaAlgo.push('CPF')
    if (! data_nascimento) faltaAlgo.push('data_nascimento')
    if (! conta.tipo) faltaAlgo.push('conta: { tipo }')
    if (faltaAlgo.length != 0){
        const faltante = faltaAlgo.join(", ")
        return res.status(400).json({message: `Os seguintes dados obrigatório estão em branco: ${faltante}`})
    }
    const dadosConta = contaController.create(req, res)
    const contaNova = {
        "id": uuidv4(),
        "nome_cliente": nome_cliente,
        "cpf_cliente": cpf_cliente,
        "data_nascimento": data_nascimento,
        "conta": dadosConta
    }
/*    {
        "numero": random(1, 999999), 
        "tipo": conta.tipo,
        "saldo": 0,
        "data_criacao": new Date()
    }*/
    listaClientes.push (contaNova)
    return res.status (201).json ({message: 'Conta criada'})
}; // DONE

const show = (req, res) => {
    const nomeFiltro = req.query.nome
//  const nascFiltro = req.query.nascimento - tbm nao sei ler essa data

    const clientesFiltrados = listaClientes.filter ((cliente, index) => {
        if (nomeFiltro){
            if (cliente.nome_cliente.toLowerCase().includes(nomeFiltro.toLowerCase())) return cliente
        }
    })
    if (clientesFiltrados.length == 0){
        return res.status(404).json({message: "Nenhum cliente encontrado com o filtro usado. Para a lista completa, use o endereço: '/clientes/lista'"})
    }
    else {
        return res.json(clientesFiltrados)
    }
};

const index = (req, res) => {
    return res.json (listaClientes)
};

const update = (req, res) => {
    const clienteID = req.params.id
    const dadosAtualizados = req.body

    const {conta} = req.body
    if (conta) return res.status(400).json({message: 'Para atualizar dados da conta, utilize "/contas"'})

    const clienteExiste = listaClientes.find ( cliente => cliente.id == clienteID)
    if (clienteExiste){
        listaClientes.map ((cliente, index) => {
            if (cliente.id == clienteID){
                const infosAtualizadas = {
                    ...clienteExiste, ...dadosAtualizados
                }
                listaClientes[index] = infosAtualizadas
            }
        })
        return res.status(202).json({message:`Dados do cliente atualizados com sucesso`})
    }
    return res.status(404).json({message:"Cliente não encontrado"})
};

const destroy = (req, res) => {
    const clienteID = req.params.id

    const contaExiste = listaClientes.map ((conta, index) => {
        if (conta.id == clienteID){
            const saldo = listaClientes[index].conta.saldo
            if(saldo >= 0){
                listaClientes.splice(index, 1)
                return res.status(202).json ({message:`Conta fechada. ${conta.nome_cliente} tem R$${saldo} para saque imediato`})
            }
            return res.status(401).json (`Conta não foi fechada devido à dívida de R$${Math.abs(saldo)}`)
        }
    })
    if (! contaExiste){
        return res.status(404).json({message:'Conta não localizada'})
    }
};

module.exports = {
    create,
    show,
    index,
    update,
    destroy
}