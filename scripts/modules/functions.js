export function crearMaqueta(propertiesCards) {
    return `<div class="card col-10 col-md-5 mt-5 col-xl-3">
    <img
        src="${propertiesCards.image}"
        class="card-img-top card-h p-2"
        alt=""
    />
    <section class="card-body card text-center">
        <h5>${propertiesCards.name}</h5>
        <p class="card-text"> ${propertiesCards.description} </p>
    <div
        class="align-items-center d-flex w-100 justify-content-between"
        >
        <p class="fw-medium d-flex align-items-center m-0">
            Price: <span class="parrafo-card">$ ${propertiesCards.price}</span>
        </p>
        <a href="./assets/details/details.html?idEvent=${propertiesCards._id}" class="btn btn-primary">Details</a>
        </div>
    </section>
    </div>`
}

export function imprimirMaqueta(parametroArray, container, fnCreate) {
    let template = ""
    for (let evento of parametroArray) {
        template += fnCreate(evento)
    }
    container.innerHTML += template
}

export function crearCheckBox(category){
    return `<div class="form-check form-check-inline">
    <input
        class="border-check form-check-input"
        type="checkbox"
        id="${category}"
        value="${category}"
    />
    <label class="form-check-label" for="${category}"
        >${category}</label
    >
    </div>`
}

export function imprimirCheckBox(events, container, fnCreate){
    let input = ""
    events.forEach(element => {
        input += fnCreate(element)
    });
    container.innerHTML += input
}

function filterByCategories(array, nodeList) {
    let checkBoxArray = Array.from(nodeList).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    let aux = array.filter(event => checkBoxArray.includes(event.category) || checkBoxArray.length == 0)
    return aux
}

function filterByInputSearch(array, input) {
    let filteredArray = array.filter(evento => evento.name.toLowerCase().includes(input.toLowerCase()))
    return filteredArray
}

export function crossedFilter(arrayOrigin, valueUser, checkboxChecked) {
    let filterInputSearchCrossed = filterByInputSearch(arrayOrigin, valueUser)
    let filterCheckboxCrossed = filterByCategories(filterInputSearchCrossed, checkboxChecked)
    return filterCheckboxCrossed
}