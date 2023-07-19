const contentStats = document.getElementById("")
let date;
let datosEvents;
const contenedorUno = document.getElementById("nomb")
const contenedorDos = document.getElementById("nomb2")
const contenedorTres = document.getElementById("nomb3")
const contenedorUpUno = document.getElementById("nomb2-1")
const contenedorPass = document.getElementById("nomb3-1")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(respuesta => respuesta.json())
.then(data => {
     datosEvents = data.events
     date = data.currentDate

    const arrayOrden = Array.from(datosEvents).sort(function(a, b){
        return b.capacity - a.capacity
    })
    let mayorCapacidad = arrayOrden[0].capacity
    let mayorCapacidadNombre = arrayOrden[0].name
    console.log(arrayOrden);

    let eventosPass = datosEvents.filter(evento => evento.date < date)
    console.log(eventosPass)
    
    let eventoUpcom = datosEvents.filter (evento => evento.date >= date)
    console.log(eventoUpcom)
    
    eventosPass.sort((a,b)=>calculoPorcent(a.assistance, a.capacity) - calculoPorcent(b.assistance, b.capacity))
    let eventoChico = eventosPass[0]
    let eventoGrande = eventosPass[eventosPass.length-1]
    let porcentaje = calculoPorcent(eventoGrande.assistance, eventoGrande.capacity).toFixed(1)
    let porcentajeB = calculoPorcent(eventoChico.assistance, eventoChico.capacity).toFixed(1)
    tablaUno(eventoGrande, contenedorUno, porcentaje)
    tablaUno(eventoChico, contenedorDos, porcentajeB)
    tablaUnoCapacidad(mayorCapacidadNombre, contenedorTres, mayorCapacidad)
    
    
    let categoriaPass = eventosPass.map(eventosPass => eventosPass.category)
    let categoriaPassArray = Array.from(new Set(categoriaPass))
    console.log(categoriaPassArray)

    let categoriaUp = eventoUpcom.map(eventoUpcom => eventoUpcom.category)
    let categoriaUpArray = Array.from(new Set(categoriaUp))
    console.log(categoriaUpArray)
    let revenues;
    let assistanceProm;
    let revenuesPass
    let assistancePormPass
   categoriaUpArray.forEach(categoUpcom => {
   revenues = 0
   assistanceProm = 0
    let eventosPorCategoria = eventoUpcom.filter(eventoUpcoming => eventoUpcoming.category == categoUpcom)
    // console.log(eventosPorCategoria)
    eventosPorCategoria.forEach(evento =>{
        revenues +=  evento.estimate * evento.price
        // console.log(revenues)
        assistanceProm += calculoPorcent (evento.estimate, evento.capacity)
    })
    revenues = revenues.toLocaleString()
    console.log(revenues)
    assistanceProm = assistanceProm / eventosPorCategoria.length
    // console.log(assistanceProm)
    
    tablaDos(contenedorUpUno,categoUpcom, revenues, assistanceProm.toFixed(2))
   })


   categoriaPassArray.forEach(categoPass =>{
    revenuesPass = 0
    assistancePormPass = 0
    let eventosPorCategoriaPass = eventosPass.filter(eventoPassed => eventoPassed.category == categoPass)

    eventosPorCategoriaPass.forEach(evento =>{
        revenuesPass += evento.assistance * evento.price
        assistancePormPass += calculoPorcent(evento.assistance, evento.capacity)
    })
    revenuesPass = revenuesPass.toLocaleString()
    console.log(revenuesPass)
    assistancePormPass = assistancePormPass / eventosPorCategoriaPass.length
    tablaDos(contenedorPass, categoPass, revenuesPass, assistancePormPass.toFixed(2))

   })

}
)
.catch(error => console.log(error))


function calculoPorcent(assistance, capacidad){
    let porcent = (assistance / capacidad) * 100
    return porcent
}
function tablaUno(evento, htmlContain, porcentaje){
    htmlContain.innerHTML = `
    <td>${evento.name} ${porcentaje} %</td>
    `
}
function tablaUnoCapacidad(evento, htmlContain, porcentaje){
    htmlContain.innerHTML = `
    <td>${evento} ${porcentaje}</td>
    `
}


function tablaDos(htmlContain, name, revenues, assistanceProm){
    htmlContain.innerHTML += 
     `<tr><td>${name}</td>
      <td>$${revenues}</td>
      <td>${assistanceProm}%</td></tr>`
  }

