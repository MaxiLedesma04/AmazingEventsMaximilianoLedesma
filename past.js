const events = data.events
let containerPastEvents = document.getElementById("containerPast")
const days = data.currentDate
const contenedorInputs = document.getElementById("formul")

function cardsPastev(array, place, date){
    let cardsPast = " "
    for(let events of array){
        if(events.date < date){
            cardsPast += `<div class="contenedor">
            <img src="${events.image}">
            <div class="d-flex flex-column align-items-center">
                <H2>${events.name}</H2>
                <p>${events.description}</p>
            </div>
            <div class="precios-y-details">
                <h4>$ ${events.price}</h4>
                <a href="../details/details.html?parametro=${events._id}">Details</a>
            </div>
        </div>`
        }
    }
    place.innerHTML = cardsPast
}
cardsPastev(events, containerPastEvents, days)

function categoriasCheck () {
    let checkcsNuevos = document.querySelectorAll("input:checked")
    let arrayNuevo = Array.from(checkcsNuevos).map(e => e.value)
    return arrayNuevo
}
function crearInputs(categories){
    return `<div class="eleccion px-4">
    <label for="${categories}">${categories}</label>
    <input onchange ="categoriasCheck()" type="checkbox" id="${categories}" name="categ" value="${categories}">
    </div>`
}

function mostrarInputs (array, place){
    for(let categories of array){
        place.innerHTML += crearInputs(categories)
    }
}
let categoriasTodas = events.map(events => events.category)
let categorias = Array.from(new Set(categoriasTodas))

mostrarInputs(categorias, contenedorInputs)

let inputDeCheks = document.querySelectorAll("input[type='checkbox']")

const searchInput = document.getElementById("search")

contenedorInputs.addEventListener("change", () =>{
    let filtroCheck = filtrosCruzados(events, contenedorInputs, searchInput)
   containerPastEvents.innerHTML = " "
     if(filtroCheck.length == 0){
       containerPastEvents.innerHTML = '<h2>No serch coincidence</h2>'
     }else{
      cardsPastev(filtroCheck,containerPastEvents, days)
     }
})


searchInput.addEventListener("input", () =>{
    let filtroCheck = filtrosCruzados(events, contenedorInputs, searchInput)
   containerPastEvents.innerHTML = " "
     if(filtroCheck.length == 0){
       containerPastEvents.innerHTML = '<h2>No serch coincidence</h2>'   
     }else{
      cardsPastev(filtroCheck,containerPastEvents, days)
     }
    
})

function filtrodeChecbox(arrayOrigin, nodelistnueva){
    let inputDeCheksArray = Array.from(nodelistnueva)
    let aux = inputDeCheksArray.filter(checkbox => checkbox.checked == true).map(checkbox => checkbox.value)
    let filtrocheck = arrayOrigin.filter(event => aux.includes(event.category) || aux.length == 0)
    return filtrocheck
}

function searchDeInputFilt(arrayOriginIn, inputPasado){
    let eventosFiltrados = arrayOriginIn.filter(events => events.name.toLowerCase().includes(inputPasado.value.toLowerCase()))
    return eventosFiltrados
}

function filtrosCruzados(arrayEventosFinal, categoriaFinal, nombreFinal){
    let finalArray = filtrodeChecbox(arrayEventosFinal, categoriaFinal)
    let finalSearch = searchDeInputFilt(finalArray, nombreFinal)
    return finalSearch
}
