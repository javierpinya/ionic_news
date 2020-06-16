import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;


  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {
    this.headLinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
    // En el propio get le indicamos de qué tipo es el objeto que vamos a recibir "RespuestaTopHeadLines", que ya existe en nuestra interface
    // return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=d862a43a43e24319a615fbd4dff01259`);
  }

  getTopHeadLinesCategoria( categoria: string ) {
    if (this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    //return this.http.get<RespuestaTopHeadLines>(``);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=de&category=${categoria}&page=${this.categoriaPage}`)
  }
}
