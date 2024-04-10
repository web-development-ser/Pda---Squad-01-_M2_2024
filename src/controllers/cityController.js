import { City } from '../models/City.js'

let listCityAdded = [];
export function addCity (nome, latitude, longitude, qualidadeAr, data) {
    const newCity = new City(nome, latitude, longitude, qualidadeAr, data);
    listCityAdded.push(newCity)
    return newCity;
}

export function listCity() {
    return listCityAdded
}