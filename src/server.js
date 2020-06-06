const express = require("express")
const server = express()


// Pegar o banco de dados
const db = require("./database/db")


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
    // Recebendo dados do formulário
    console.log(req.query)

    return res.render("create-point.html")
})

// 3 - Página search-results
server.get("/search-results", (req, res) => { // Requisição e resposta
    // Pegar informações do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log(rows)
        const total = rows.length

        // Mostrar à página html com as informações do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})


// Ligar o servidor
server.listen(3000)