import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[]=[];
  private apiKeyGif: string ='X28JSEKvTKP90xuBwfspk9228DDmGup7'
  public resultados : any[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private hhtp: HttpClient) { }

  buscarGifs(query : string = ''){

    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
    }
    
    this.hhtp.get(`http://api.giphy.com/v1/gifs/search?api_key=X28JSEKvTKP90xuBwfspk9228DDmGup7&q=${ query }&limit=10`)
      .subscribe( (resp:any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      })

  }

}
