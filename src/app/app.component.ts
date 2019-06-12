import { Component, OnInit } from '@angular/core';
import { PrevisaoService } from './services/previsao.service';
import { PokemonService } from './services/pokemon.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Consulta Pokemon pela temperatura da cidade';

  temperatura;
  temparaturaConvertida: number;  
  erro: string = '';
  clima: string = '';
  pokemon;
  nomePokemon: string = '';
  radomPokemon: number;

  constructor(private previsaoService: PrevisaoService, 
    private pokemonService: PokemonService) {

  }

  ngOnInit() {
    
  }

  carregaTemperatura(local: string) {
    this.previsaoService.consultaTemperaturas(local)
      .subscribe(                
        res => {                  
          this.temperatura = res,
          this.temparaturaConvertida = this.converteParaCelsius(this.temperatura.main.temp),
          this.clima = this.condicaoClima(this.temperatura.weather[0].main)
        },
        err => {
          alert('Cidade não existe')
        }
      )
  }

  carregaPokemon(tipo: string) {
    this.pokemonService.consultaPokemon(tipo)
    .subscribe(
      res => {        
        this.pokemon = res,                
        this.radomPokemon = Math.floor(Math.random() * 10),
        this.nomePokemon = this.pokemon.pokemon[this.radomPokemon].pokemon.name
      },
      err => {
        alert('Consulta do pokemon inválida')
      }
    )
  }

  carregaTipoPokemon() {
    if (this.clima == 'Rain'){
      this.carregaPokemon('electric')
    } else {
      if (this.temparaturaConvertida < 5)
        this.carregaPokemon('ice')
      else if (this.temparaturaConvertida >= 5 && this.temparaturaConvertida < 10) 
        this.carregaPokemon('water')
      else if (this.temparaturaConvertida >= 12 && this.temparaturaConvertida < 15)
        this.carregaPokemon('grass')
      else if (this.temparaturaConvertida >= 15 && this.temparaturaConvertida < 21)
        this.carregaPokemon('ground')
      else if (this.temparaturaConvertida >= 23 && this.temparaturaConvertida < 27)
        this.carregaPokemon('bug')
      else if (this.temparaturaConvertida >= 27 && this.temparaturaConvertida < 33)
        this.carregaPokemon('rock')
      else if (this.temparaturaConvertida > 33)
        this.carregaPokemon('fire')
      else
        this.carregaPokemon('normal')
    }
  }

  converteParaCelsius(temperatura: number) {
    let resultado = 0;
    return resultado = Math.round(temperatura - 273.15);
  }

  condicaoClima(clima: string) {
    if (clima == 'Rain')    
      return 'Sim'
    else  
      return 'Não';    
  }

  submitLocal(local: HTMLInputElement){
    if(local.value) {
      this.carregaTemperatura(local.value);            
      this.carregaTipoPokemon();
      local.value = '';      
    } else {
      alert('Insira uma cidade!');
    }
    
    local.focus();
    return false;
  }
}
