const express = require("express")
const server = express()

// Configurar pasta pública
server.use(express.static("public"))


// Template engine - Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// CONFIGURAÇÃO DOS CAMINHOS DA APLICAÇÃO
// 1 - Página index
server.get("/", (req, res) => { // Requisição e resposta
    return res.render("index.html", { title: "Um título"})
})
// 2 - Página create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
// 3 - Página search-results
server.get("/search-results", (req, res) => { // Requisição e resposta
    return res.render("search-results.html")
})


// Ligar o servidor
server.listen(3000)