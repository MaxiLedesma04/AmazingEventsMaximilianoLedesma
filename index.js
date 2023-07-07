let container = document.getElementById("contain-target")
// console.log(container)
const events = data.events

function cards(array, place){
    let homeCard = " "
    for (let events of array){
        homeCard += `<div class="contenedor">
        <img src="${events.image}" alt="cinema">
        <div class="d-flex flex-column align-items-center">
            <H2 >${events.name}</H2>
            <p>${events.description}
            </p>
        </div>
        <div class="precios-y-details">
            <h4>$${events.price}</h4>
            <a href="./assets/details/details.html">Details</a>
        </div>
    </div>`
    }
    place.innerHTML = homeCard
}

cards(events, container)