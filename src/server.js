const express = require("express")
const server = express()

// Configurar pasta pública
server.use(express.static("public"))

// CONFIGURAÇÃO DOS CAMINHOS DA APLICAÇÃO
// 1 - Página index
server.get("/", (req, res) => { // Requisição e resposta
    res.sendFile(__dirname + "/views/index.html")
})
// 2 - Página create-point
server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})
// 3 - Página search-results
server.get("/search-results", (req, res) => { // Requisição e resposta
    res.sendFile(__dirname + "/views/search-results.html")
})

// Ligar o servidor
server.listen(3000)