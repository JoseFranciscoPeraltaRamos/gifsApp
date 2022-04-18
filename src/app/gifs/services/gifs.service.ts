import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[]=[];
  private apiKeyGif: string ='X28JSEKvTKP90xuBwfspk9228DDmGup7'
  public resultados : Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private hhtp: HttpClient) { 

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


    
//    if(localStorage.getItem('historial')){
//      this._historial=JSON.parse(localStorage.getItem('historial')!);
//      this.resultados= JSON.parse(localStorage.getItem('imagen')!);
//    }
  }

  buscarGifs(query : string = ''){

    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    this.hhtp.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=X28JSEKvTKP90xuBwfspk9228DDmGup7&q=${ query }&limit=10`)
      .subscribe( (resp:any) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      })

  }

}
