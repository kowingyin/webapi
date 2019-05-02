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
  addUser(name,username,password){

  }
  getFilms(query,year) {
    return this.http.get('http://localhost:8080/films?q='+query+'&y='+year)
  }
  getFilmsWithId(imdbId){
    return this.http.get('http://localhost:8080/films?i='+imdbId+'&y=')
  }
  getCommentOfFilm(imdbId){
    return this.http.get('http://localhost:8080/comment?i='+imdbId)
  }
  postComment(){

  }
  updateComment(){

  }
  delComment(){

  }
  addFav(){

  }
  getFav(){
    return this.http.get('http://localhost:8080/favourite')
  }
  delFav(){

  }

}
