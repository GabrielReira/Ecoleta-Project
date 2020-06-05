// Aparecer a tela modal quando o usuário clicar em "Pesquisar ponto de coleta"
// Fechar tela modal quando o usuário clicar no X

const buttonSearch = document.querySelector("#page-home main a") // click no pesquisar
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")        // click no X

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})
