import { Controller, Get } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrcodeService) {}

  @Get()
  async getQrCode(): Promise<string> {
    return await this.qrCodeService.generateSlugForQrCode();
  }
}
