import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async saveRandomMovies(qrSlug: string): Promise<Movie[]> {
    // Get the list of movies from the API
    const moviesJson = fs.readFileSync('src/movie/Film.JSON', 'utf8');
    const movies: any = JSON.parse(moviesJson);
    // const movies = await this.shuffleArray(moviesGotten);

    // Generate 10 random movies
    const randomMovies = [];
    for (let i = 0; i < 10; i++) {
      const randomMovieIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomMovieIndex];

      // Convert the random movie to a new movie object
      const newMovie = new Movie();
      newMovie.qr_slug = qrSlug;
      newMovie.title = randomMovie.Title;
      newMovie.release_date = randomMovie.Released;
      newMovie.genre = randomMovie.Genre;
      newMovie.image = randomMovie.Poster;
      newMovie.rating = randomMovie.imdbRating;

      // Save the new movie to the database
      await this.movieRepository.save(newMovie);

      // Add the new movie to the random movies array
      randomMovies.push(newMovie);
    }

    return randomMovies;
  }

  async getAllMoviesByQrSlug(slug: string): Promise<Movie[]> {
    return await this.movieRepository.find({ where: { qr_slug: slug } });
  }
}
