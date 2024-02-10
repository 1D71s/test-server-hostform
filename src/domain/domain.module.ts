import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {DomainSchema} from "@src/domain/domain.model";

@Module({
  controllers: [DomainController],
  providers: [DomainService],
  imports: [
    MongooseModule.forFeature([{ name: 'Domain', schema: DomainSchema }])

  ]
})
export class DomainModule {}
