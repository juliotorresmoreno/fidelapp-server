import { Module } from '@nestjs/common';
import { AwsSnsService } from './aws-sns.service';

@Module({
    providers: [AwsSnsService]
})
export class AwsSnsModule {}
