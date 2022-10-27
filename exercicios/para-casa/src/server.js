const express = require('express')
const routes = require("../src/router/routes")
const app = express()
const port = 3000

app.use(express.json())
app.use(routes)


app.listen(port, () => {
    console.log(`API esta rodando perfeitamente na porta ${port}`)
})