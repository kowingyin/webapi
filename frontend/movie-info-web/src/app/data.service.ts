import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  //firstClick() {
    //return console.log('clicked');
  //}
  getFilms(query,year) {
    return this.http.get('http://localhost:8080/films?q='+query+'&y='+year)
  }
}
