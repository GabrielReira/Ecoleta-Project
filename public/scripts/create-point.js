// DADOS DA ENTIDADE
// Pegando a lista de UFs no site do IBGE - Array de 27 elementos (estados)
// https://servicodados.ibge.gov.br/api/v1/localidades/estados

function populateUFs() { // Preencher os campos de opção de estados
    const ufSelect = document
        .querySelector("select[name=uf]") // Pegando o campo select de name=uf do arquivo html

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() ) // Função anônima para retornar a resposta em json
    .then ( states => {
        for (const state of states) { // Loop para preencher com os nomes dos estados
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}
populateUFs()

// Pegando a lista de Municípios no site do IGBE
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

function getCities(event) {
    const citySelect = document
        .querySelector("select[name=city]") // Pegando o campo select de name=city no .html
    const stateInput = document.querySelector("input[name=state]")

    // Referência a cada ufValue para as cidades, cada UF exibirá seus respectivos municípios
    const ufValue = event.target.value // Pegando o valor dos id referente a cada estado no IBGE

    // Muda o valor do input hyden, alterando também a URL com o nome do estado e cidade
    const indexState = event.target.selectedIndex
    stateInput.value = event.target.options[indexState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // O conteúdo começa como vazio para evitar bugs
    citySelect.innerHTML = "<option>Selecione a cidade</option>" 
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then ( cities => {

        for (const city of cities) { // Loop para preencher com os nomes das cidades
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false // Desativa o disabled do create-point.html
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) // Executar função quando houver mudança


// ITENS DE COLETA
// Dinamismo para quando os itens forem selecionados

// Pegando todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) // Executar função quando houver mudança
}

// Campo hidden para guardar os valores do usuário
const collectedItem = document.querySelector("input[name=items]")

// Colocar os itens selecionados numa array
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // Adicionar ou remover um item selecionado
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados, se sim pegá-los
    const alreadySelected = selectedItems.findIndex( item => {
        return item == itemId // True se estiver selecionado ou False se não
    })

    // Se um item já estiver selecionado, tirá-lo da seleção
    if (alreadySelected >= 0) { // Se o index for >=0 já tem algo selecionado
        // Tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })
        selectedItems = filteredItems
    }
    // Se um item não estiver selecionado, adcioná-lo à seleção
    else {
        selectedItems.push(itemId)
    }
    // console.log(selectedItems) // Já aparece o js rodando certinho, tirando e colando itens

    // Atualizar o campo hidden com os itens selecionados
    collectedItem.value = selectedItems

}