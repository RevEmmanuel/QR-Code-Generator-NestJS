import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrcodeService } from './qrcode/qrcode.service';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, QrcodeService, MoviesService],
})
export class AppModule {}
