const express = require("express")
const server = express()


// Pegar o banco de dados
const db = require("./database/db")


// Configurar pasta pública
server.use(express.static("public"))


// Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))


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
// Enviando os dados do formulário com o verbo POST
server.post("/savepoint", (req, res) =>  {
    console.log(req.body)

    // Inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro.")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved:true})
    }

    db.run(query, values, afterInsertData)
})


// 3 - Página search-results
server.get("/search-results", (req, res) => { // Requisição e resposta
    // Resultados da pesquisa
    const search = req.query.search
    if(search == "") { // Quando a pesquisa for vazia
        return res.render("search-results.html", { total: 0 })
    }

    // Pegar informações do banco de dados
    // Resultado da pesquisa quando o usuário fizer uma busca de cidade
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
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