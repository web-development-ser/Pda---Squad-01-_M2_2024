import { City } from '../models/City.js'

export function addCity (nome, latitude, longitude, qualidadeAr, data) {
    const newCity = new City(nome, latitude, longitude, qualidadeAr, data);
    return newCity;
}