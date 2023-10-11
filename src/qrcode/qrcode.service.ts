import { Injectable } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import * as crypto from 'crypto';

@Injectable()
export class QrcodeService {
  constructor(private readonly movieService: MovieService) {}

  async generateSlugForQrCode(): Promise<string> {
    // Generate a slug and save 10 movies using the slug
    const slug = await this.generateRandomString();
    await this.movieService.saveRandomMovies(slug);
    // Concatenate the base url and the slug and generate a qrcode for it
    return slug;
  }

  async generateRandomString(): Promise<string> {
    const randomString = crypto.randomBytes(6).toString('hex');
    return randomString.substring(0, 6);
  }
}
