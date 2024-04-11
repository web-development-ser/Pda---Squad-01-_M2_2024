import { City } from '../models/City.js';

let listCityAdded = [];
export function addCity (name, latitude, longitude, airQuality, date) {
    const newCity = new City(name, latitude, longitude, airQuality, date);
    listCityAdded.push(newCity);
    return newCity;
}

export function listCity() {
    return listCityAdded;
}