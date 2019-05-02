import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // Import it up here
import { HttpHeaders } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private interceptor:AuthInterceptor) { }
  addUser(name,username,password,email){
    var addUser='https://cors-anywhere.herokuapp.com/https://cycbookshop.herokuapp.com/users'
	 
    let authorizationData = 'Basic '+  btoa(`${username}:${password}`);
      //  console.log(`${username}:${password}`+' '+choice);
      //  console.log(authorizationData);
    
  
    const httpOptions = new  HttpHeaders()
      .set('Accept','application/json') 
    .set('Content-type', 'application/json')
    .set('Authorization',`${authorizationData}`)
    .set('Access-Control-Allow-Origin','*')
    .set('Access-Control-Allow-Credentials', 'true')
    .set('X-Requested-With', 'HttpRequest')
    return this.http.post('http://localhost:8080/accounts',{'name':`${name}`,'email':`${email}`},{headers:httpOptions}).pipe(
      retry(1),
     catchError(this.handleError)
    );
  }
  getFilms(query,year) {
    return this.http.get('http://localhost:8080/films?q='+query+'&y='+year).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getFilmsWithId(imdbId){
    return this.http.get('http://localhost:8080/films?i='+imdbId+'&y=').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getCommentOfFilm(imdbId){
    return this.http.get('http://localhost:8080/comment?i='+imdbId).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  postComment(imdbId,Comment){
    //return this.http.post('http://localhost:8080/comment',)
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
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
