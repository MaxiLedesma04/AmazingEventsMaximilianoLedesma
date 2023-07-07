let containerPastEvents = document.getElementById("containerPast")

const events = data.events

const days = data.currentDate

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
                <a href="../details/details.html">Details</a>
            </div>
        </div>`
        }
    }
    place.innerHTML = cardsPast
}
cardsPastev(events, containerPastEvents, days)