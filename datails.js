let detalle = document.getElementById("tarjetaDetalle")
const arrayEventDetail = data.events
console.log(arrayEventDetail)
let parametro = location.search;
let parametroEvento = new URLSearchParams(parametro)

const idEvento = parametroEvento.get("parametro")
const eventoTarjet = arrayEventDetail.find((evento) => evento._id === idEvento)
console.log(eventoTarjet)
function mostrarTarjeta(array, placeHTML){
    placeHTML.innerHTML = `            <div>
    <img class="detalles-image" src="${array.image}" alt="food-fair">
    <ul>
        <li>name: ${array.name}</li>
        <li>date: ${array.date}</li>
        <li>description:${array.description} </li>
        <li>category:${array.category}</li>
        <li>place: ${array.place}</li>
        <li>capacity: ${array.capacity}</li>
        <li>assistance: ${array.assistance}</li>
        <li>price: ${array.price}</li>
    </ul>
    </div>`
}

mostrarTarjeta(eventoTarjet, detalle)