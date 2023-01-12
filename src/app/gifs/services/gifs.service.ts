import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root', //angular lo eleva a nivel global de la aplicación
})
export class GifsService {

  private apiKey: string = 'FFXeBNEEPj0rMdt1PJXw9p32G4YeCFmi';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //cargar de localStorage

    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=FFXeBNEEPj0rMdt1PJXw9p32G4YeCFmi&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;        
      });

    console.log(this._historial);
  }
}
