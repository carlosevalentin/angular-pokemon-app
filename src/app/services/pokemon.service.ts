import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl: string = '';

  constructor(private http: HttpClient) { 
    this.apiUrl = 'https://pokeapi.co/api/v2/type/'
  }

  consultaPokemon(tipo: string) {
    return this.http.get(this.apiUrl + tipo);
  }

}
