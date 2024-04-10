import { Cidade } from '../models/Cidade.js'

export function criarCidade (nome, latitude, longitude, qualidadeAr, data) {
    const newCidade = new Cidade(nome, latitude, longitude, qualidadeAr, data);
    return newCidade;
}