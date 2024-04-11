import { addCity, listCity } from "../../controllers/cityController.js";

const city = document.getElementById('icidade')
const buttonSubmit = document.getElementById('isubmit')
const main = document.getElementsByClassName('main')[0]
const loading = document.getElementById('loading');

buttonSubmit.addEventListener('click', async (event) => {
    if(city.value.length>=3 && city.value.trim().length >= 1) {
        event.preventDefault()
        viewLoading();
        const coordinates = await searchAPI(city.value)
        if (coordinates) {
            const informations = await verifyEnvironment(coordinates.lat, coordinates.lon);
            if(informations) {
                const arrayCitySearched = listCity();
                const list = arrayCitySearched.filter(cityObj => cityObj.name === cityName);
                if(list.length > 0) {
                    alert('Você acabou de pesquisar sobre essa cidade.')
                } else {
                    const citySearched = addCity(city.value, coordinates.lat, coordinates.lon, informations.aqius, informations.ts)
                    createCard(citySearched)
                }
            }
        }
    }
    hideLoading();
})

async function searchAPI(nameCity) {
    try {
        const response = await fetch (`https://nominatim.openstreetmap.org/search?city=${nameCity}&format=json`)
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        } else {
            throw new Error();
        }
    } catch(error) {
        alert("Não foi possível achar a cidade digitada")
    }

}


async function verifyEnvironment(latitude,longitude){
    try {
        const response = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=8b32da38-7eb7-4efc-9f42-582d589da180`)
        const data = await response.json()

        if (data.data.current) {
            return {
                aqius: data.data.current.pollution.aqius,
                mainus: data.data.current.pollution.mainus,
                ts: data.data.current.pollution.ts
            };
        } else {
            throw new Error();
        }

       }
     catch (error) {
        alert("Não foi possível obter informações do ambiente da sua cidade")
    }
 }


function createCard(citySearched) {
    const div = document.createElement('div')
    div.classList.add('card')

    const divResult = document.createElement('div')
    divResult.classList.add('card-air')

    const airQualityIndex = document.createElement("span")
    airQualityIndex.innerHTML = citySearched.airQuality;

    const result = document.createElement("span")
    if(citySearched.airQuality <= 50) {
        result.innerHTML = "Bom"
        div.style.backgroundColor = 'green'
    } else if(citySearched.airQuality <= 50) {
        result.innerHTML = "Moderado"
        div.style.backgroundColor = 'lightgreen'
    } else if(citySearched <= 150 ) {
        result.innerHTML = "Insalubre"
        div.style.backgroundColor = '#a4ad14'
    } else if(citySearched.airQuality <= 200) {
        result.innerHTML = "Insalubre"
        div.style.backgroundColor = '#7d840f'
    } else if (citySearched.airQuality <= 300) {
        result.innerHTML = "Muito insalubre"
        div.style.backgroundColor = 'lightred'
    } else if(citySearched.airQuality <= 500) {
        result.innerHTML = "Perigoso"
        div.style.backgroundColor = 'red'
    }

    const divInfo = document.createElement('div')
    divInfo.classList.add('card-info')

    const city = document.createElement("span")
    city.innerHTML = citySearched.name
    city.classList.add('card-city')
    const date = document.createElement("span")
    const dateMoment = moment(citySearched.date)

    date.innerHTML = `Atualizado às ${dateMoment.format('DD/MM/YYYY HH:mm:ss')}`
    date.classList.add('card-date')

    divResult.appendChild(airQualityIndex)
    divResult.appendChild(result)

    divInfo.appendChild(city)
    divInfo.appendChild(date)

    div.appendChild(divResult)
    div.appendChild(divInfo)
    main.appendChild(div)

}

function viewLoading() {
    loading.style.display = 'flex';
}

function hideLoading() {
    loading.style.display = 'none';
}