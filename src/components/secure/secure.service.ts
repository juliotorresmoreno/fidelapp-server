import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import getConfig from 'src/config/configuration';

@Injectable()
export class SecureService {
    createHash(text: string) {
        const config = getConfig();
        const hash = crypto.createHash('sha256');

        hash.update(text);        
        hash.update(config.secret);
    
        return hash.digest('hex');
    }
}
