import { Injectable } from '@nestjs/common';
import getConfig from 'src/config/configuration';
import { Configuration } from 'src/types/configuration';
import { SESV2 } from 'aws-sdk';

@Injectable()
export class AwsSesService {
    private config: Configuration;
    private clientSESv2?: SESV2;

    constructor() {
        this.config = getConfig();
        const awsConfig = this.config.aws;
        if (awsConfig && awsConfig.credentials) {
            this.clientSESv2 = new SESV2({
                credentials: this.config.aws.credentials,
                region: (awsConfig.sns || {}).region || awsConfig.region
            });
        }
    }

    async sendEMAIL(to: string, subject: string, message: string) {
        const nodeEnv = this.config.env;
        const config = getConfig();
        if (!this.clientSESv2) {
            throw new Error('No se puede enviar el Email')
        };
        const result = await this.clientSESv2.sendEmail({
            FromEmailAddress: config.aws.ses.default_from,
            Destination: { ToAddresses: [to] },
            Content: {
                Simple: {
                    Body: {
                        Html: {
                            Data: message,
                            Charset: 'utf-8'
                        }
                    },
                    Subject: {
                        Data: subject,
                        Charset: 'utf-8'
                    }
                }
            }
        }).promise();
        if (nodeEnv === 'development') {
            console.log('Enviado', to, subject, message, result);
        }
    }
}
