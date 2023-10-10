import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrcodeService } from './qrcode/qrcode.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, QrcodeService],
})
export class AppModule {}
