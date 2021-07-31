import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class AppComponent {
  movies = [{title: 'titanic'},{title: 'avatar'}]
  selectedMovie: any;

  constructor(private api:ApiService){
    this.getMovies();
    this.selectedMovie = {id: -1, title: '', desc: '', year: 0}
  }

  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        alert("Se cargo las peliculas con exito");
        this.movies = data;
      },
      error => {
        alert("Error al cargar peliculas");
      }
    );
  }

  movieClicked = (movie:any) => {
    console.log(movie.id);
    this.api.getOneMovie(movie.id).subscribe(
      data => {
        this.selectedMovie = data;
        console.log(this.selectedMovie);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMovie = () => {
    this.api.updateMovie(this.selectedMovie).subscribe(
      data => {
        this.selectedMovie = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe(
      data => {
        this.movies.push(data)
      },
      error => {
        console.log(error);
      }
    );
  }

}
