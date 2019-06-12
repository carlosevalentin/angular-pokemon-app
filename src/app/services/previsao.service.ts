import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PrevisaoService {  
  apiUrl: string = '';
  
  constructor(private http: HttpClient) { 
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=2485fe11c409e6e56cdff1d65c51a0f1&q='
  }

  consultaTemperaturas(local: string) {
    return this.http.get(this.apiUrl + local);    
  }
}
