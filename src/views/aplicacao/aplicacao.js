import { addCity } from "../../controllers/cityController.js"

const city = document.getElementById('icidade')
const buttonSubmit = document.getElementById('isubmit')
const main = document.getElementsByClassName('main')[0]
const carregando = document.getElementById('carregando');

buttonSubmit.addEventListener('click', async (event) => {
    if(city.value.length>=3 && city.value.trim().length >= 1) {
        event.preventDefault()
        mostrarCarregando();
        const coordenadas = await searchAPI(city.value)
        if (coordenadas) {
            const informations = await verifyEnvironment(coordenadas.lat, coordenadas.lon);
            if(informations) {
                const cidadePesquisada = addCity(city.value, coordenadas.lat, coordenadas.lon, informations.aqius, informations.ts)
                createCard(cidadePesquisada)
            }
        }
    }
    esconderCarregando();
})

async function searchAPI(nomeCidade) {
    try {
        const response = await fetch (`https://nominatim.openstreetmap.org/search?city=${nomeCidade}&format=json`)
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


function createCard(cidadePesquisada) {
    const div = document.createElement('div')
    div.classList.add('card')

    const divResultado = document.createElement('div')
    divResultado.classList.add('card-ar')

    const indiceQualidadeAr = document.createElement("span")
    indiceQualidadeAr.innerHTML = cidadePesquisada.qualidadeAr;

    const resultado = document.createElement("span")
    if(cidadePesquisada.qualidadeAr <= 50) {
        resultado.innerHTML = "Bom"
        // boa
    } else if(cidadePesquisada.qualidadeAr <= 50) {
        resultado.innerHTML = "Moderado"
        // moderada
    } else if(cidadePesquisada <= 150 ) {
        resultado.innerHTML = "Insalubre"
        // insalubre
    } else if(cidadePesquisada.qualidadeAr <= 200) {
        resultado.innerHTML = "Insalubre"
        // insalubre 
    } else if (cidadePesquisada.qualidadeAr <= 300) {
        resultado.innerHTML = "Muito insalubre"
        // muito insalubre
    } else if(cidadePesquisada.qualidadeAr <= 500) {
        resultado.innerHTML = "Perigoso"
        // perigoso
    }

    const divInfo = document.createElement('div')
    divInfo.classList.add('card-info')

    const cidade = document.createElement("span")
    cidade.innerHTML = cidadePesquisada.nome

    const data = document.createElement("span")
    const dataMoment = moment(cidadePesquisada.data)

    data.innerHTML = `Atualizado às ${dataMoment.format('DD/MM/YYYY HH:mm:ss')}`
    data.classList.add('card-data')

    divResultado.appendChild(indiceQualidadeAr)
    divResultado.appendChild(resultado)

    divInfo.appendChild(cidade)
    divInfo.appendChild(data)

    div.appendChild(divResultado)
    div.appendChild(divInfo)
    main.appendChild(div)

}

function mostrarCarregando() {
    carregando.style.display = 'block';
}

// Função para esconder o indicador de carregamento
function esconderCarregando() {
    carregando.style.display = 'none';
}