import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor( private noticiasService: NoticiasService) {}

  noticias: Article[] = [];

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    // console.log(event);
    this.cargarNoticias( event );
  }

  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadLines()
      .subscribe( resp => {
        // console.log('noticias', resp);
        if ( resp.articles.length === 0 ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        // con el operador spread "..." le estamos diciendo a javascript que inserte una sola noticia en cada uno de los arrays
        this.noticias.push( ...resp.articles );

        if ( event ) {
          event.target.complete();
        }
      });
  }

}
