let detalle = document.getElementById("tarjetaDetalle")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resulte => resulte.json())
    .then(resulte => {
        let eventos = resulte.events
        console.log(eventos)
        let parametro = location.search;
        let parametroEvento = new URLSearchParams(parametro)
        const idEvento = parametroEvento.get("idEvent")
        let evento = eventos.find(evento => evento._id == idEvento)
        console.log(evento)
        mostrarTarjeta(evento, detalle)

    })
.catch(error => console.error(error))


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
