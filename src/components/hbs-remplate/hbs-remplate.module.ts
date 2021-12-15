import { Module } from '@nestjs/common';
import { HbsRemplateService } from './hbs-remplate.service';

@Module({
  controllers: [],
  providers: [HbsRemplateService]
})
export class HbsRemplateModule {}
