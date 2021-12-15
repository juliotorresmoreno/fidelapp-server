import { Injectable } from '@nestjs/common';

@Injectable()
export class HbsRemplateService {
    render() {
        return {
            subject: '',
            content: '',
        }
    }
}
