
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthcheckController {

    @Get('health')
    async getHealth() {
        return 'OK';
    }
}
