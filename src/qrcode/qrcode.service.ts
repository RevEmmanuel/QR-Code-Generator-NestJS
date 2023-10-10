import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';

@Injectable()
export class QrcodeService {
  async generateQRCode(text: string): Promise<string> {
    // Generate a QR code for the given text
    return qrcode.toDataURL(text);
  }
}
