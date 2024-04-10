import { criarCidade } from "../../controllers/cidadeController"

const city = document.getElementById('icidade')
const buttonSubmit = document.getElementById('isubmit')
const main = document.getElementsByClassName('main')[0]

buttonSubmit.addEventListener('click',(event) => {
    event.preventDefault()
    /*if(city.value.length>=3 && city.value.trim().length >= 1) {
        event.preventDefault()

        //console.log(        searchAPI(city.value))
    }*/
})

function searchAPI(nomeCidade) {
    fetch(`https://nominatim.openstreetmap.org/search?city=${nomeCidade}&format=json`)
        .then( res => res.json())
        .then( data => {
            return (data[0].lat, data[0].lon)
        })
}


function verifyEnvironment(latitude,longitude){
      fetch(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=8b32da38-7eb7-4efc-9f42-582d589da180`)
        .then( res => res.json())
        .then( data => console.log(data.data.current.pollution))
 }


function createCard() {
    const div = document.createElement('div')

    const indiceQualidadeAr = document.createElement("span")
    const data = document.createElement("span")
    const cidade = document.createElement("span")

    main.appendChild(div)

}