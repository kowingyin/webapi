import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
  template: `<h1>This is {{ imdbId }}'s profile!</h1>`
})
export class FilmDetailsComponent implements OnInit {
  imdbId: string;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        console.log(params.imdbId);
        this.imdbId = params.imdbId;
      });
    }

}
