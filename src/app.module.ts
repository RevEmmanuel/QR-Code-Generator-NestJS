import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { QrcodeService } from './qrcode/qrcode.service';
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { QrCodeController } from './qrcode/qrcode.controller';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entities/movie.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Movie],
        synchronize: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([Movie]),
    MovieModule,
  ],
  controllers: [AppController, MovieController, QrCodeController],
  providers: [AppService, QrcodeService, MovieService],
})
export class AppModule {}
