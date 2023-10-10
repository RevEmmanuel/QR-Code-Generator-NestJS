import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
import { MovieService } from '../movie/movie.service';
import * as crypto from 'crypto';

@Injectable()
export class QrcodeService {
  constructor(private readonly movieService: MovieService) {}
  async generateQRCode(text: string): Promise<string> {
    // Generate a QR code for the given text
    return qrcode.toDataURL(text);
  }

  async generateSlugForQrCode(): Promise<string> {
    // Get base url
    const url = process.env.DEPLOYED_URL;
    // Generate a slug and save 10 movies using the slug
    const slug = await this.generateRandomString();
    await this.movieService.saveRandomMovies(slug);
    // Concatenate the base url and the slug and generate a qrcode for it
    const qrToBeGenerated = `${url}/${slug}`;
    return await this.generateQRCode(qrToBeGenerated);
  }

  async generateRandomString(): Promise<string> {
    const randomString = crypto.randomBytes(6).toString('hex');
    return randomString.substring(0, 6);
  }
}
