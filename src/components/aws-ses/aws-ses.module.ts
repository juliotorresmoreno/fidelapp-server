import { Module } from '@nestjs/common';
import { AwsSesService } from './aws-ses.service';

@Module({
  controllers: [],
  providers: [AwsSesService]
})
export class AwsSesModule {}
