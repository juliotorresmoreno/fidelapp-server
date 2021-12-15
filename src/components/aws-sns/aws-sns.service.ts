
import { Injectable } from '@nestjs/common';
import getConfig from 'src/config/configuration';
import { Configuration } from 'src/types/configuration';
import { SNS } from 'aws-sdk';

@Injectable()
export class AwsSnsService {
    private config: Configuration;
    private clientSNS?: SNS;

    constructor() {
        this.config = getConfig();
        const awsConfig = this.config.aws;
        if (awsConfig && awsConfig.credentials) {
            this.clientSNS = new SNS({
                credentials: this.config.aws.credentials,
                region: (awsConfig.sns || {}).region || awsConfig.region
            });
        }
    }

    async sendSMS(phone: string, message: string) {
        const nodeEnv = this.config.env;
        if (!this.clientSNS) {
            throw new Error('No se puede enviar el SMS')
        };
        const result = await this.clientSNS.publish({
            Message: message,
            PhoneNumber: phone
        }).promise();
        if (nodeEnv === 'development') {
            console.log('Enviado', phone, message, result);
        }
    }
}
