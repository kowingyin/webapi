import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  h1Style: boolean = false;
  films: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getFilms("Star","").subscribe(data=>{
      this.films = data;
      console.log(this.films);
    })
  }

  firstClick() {
    //this.data.firstClick();
    this.h1Style = true;
  }
   
  searchfilm(query,year){
    this.data.getFilms(query,year).subscribe(data=>{
      this.films = data;
      console.log(this.films);
    })
  }
 }
 
