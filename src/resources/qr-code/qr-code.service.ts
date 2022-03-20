import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeService {
    generate(value: string) {
        return new Promise<Buffer>(function (resolve, reject) {
            QRCode.toBuffer(value, (err, buffer) => {
                if (err) return reject(err);

                resolve(buffer);
            });
        });
    }
}
