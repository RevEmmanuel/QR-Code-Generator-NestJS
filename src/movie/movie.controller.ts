import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':slug')
  async getMovies(@Param('slug') slug: string): Promise<any[]> {
    return await this.movieService.getAllMoviesByQrSlug(slug);
  }
}
