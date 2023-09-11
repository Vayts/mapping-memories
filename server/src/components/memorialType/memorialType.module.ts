import { Module } from '@nestjs/common';
import { MemorialTypeService } from './memorialType.service';
import { MemorialTypeController } from './memorialType.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../token/token.module';
import {
  MemorialMarker,
  MemorialMarkerSchema,
} from '../../schemas/memorialMarker.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MarkerType, MarkerTypeSchema } from '../../schemas/markerType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarkerType.name, schema: MarkerTypeSchema },
      { name: MemorialMarker.name, schema: MemorialMarkerSchema },
    ]),
    JwtModule.register({}),
    TokenModule,
    NestjsFormDataModule,
  ],
  controllers: [MemorialTypeController],
  providers: [MemorialTypeService],
})
export class MemorialTypeModule {}
