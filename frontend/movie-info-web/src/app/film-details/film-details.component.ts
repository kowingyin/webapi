import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent implements OnInit {
  imdbId: string;
  CommentList: Object;
  filmDetails: Object;

  constructor(private route: ActivatedRoute,
    private router: Router,private data: DataService) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        console.log(params.imdbId);
        this.imdbId = params.imdbId;
      });
      
      this.data.getFilmsWithId(this.imdbId).subscribe(data=>{
        this.filmDetails = data;
        console.log(this.filmDetails);
      })
      this.data.getCommentOfFilm(this.imdbId).subscribe(data=>{
        this.CommentList = data;
        console.log(this.CommentList);
      })
    }
   
    onSubmit(newComment){
      this.data.postComment(this.imdbId,newComment);
    }

}
