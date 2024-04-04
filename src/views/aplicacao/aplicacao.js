const city = document.getElementById('icidade')
const buttonSubmit = document.getElementById('isubmit')
const main = document.getElementsByClassName('main')[0]

buttonSubmit.addEventListener('click',(event) => {
    if(city.value.length>=3 && city.value.trim().length >= 1) {
        event.preventDefault()
        searchAPI(city.value)

        //verifyStateavailable()
    }
})

function searchAPI(nomeCidade) {
    fetch(`https://nominatim.openstreetmap.org/search?city=${nomeCidade}&format=json`)
        .then( res => res.json())
        .then( data =>  verifyEnvironment(data[0].lat, data[0].lon) )
}


function verifyEnvironment(latitude,longitude){
      fetch(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=8b32da38-7eb7-4efc-9f42-582d589da180`)
        .then( res => res.json())
        .then( data => console.log(data.data.current.pollution))
 }

function verifyStateavailable() {
    fetch('https://api.airvisual.com/v2/states?country=brazil&key=8b32da38-7eb7-4efc-9f42-582d589da180')
        .then( res => res.json())
        .then( data => console.log(data))
}

function createCard() {
    const div = document.createElement('div')
    main.appendChild(div)

}