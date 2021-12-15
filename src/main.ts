import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getConfig from './config/configuration';

const config = getConfig();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(config.port);
}
bootstrap();
