import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityMarker, CityMarkerSchema } from '../../schemas/cityMarker.schema';
import {
  MemorialMarker,
  MemorialMarkerSchema,
} from '../../schemas/memorialMarker.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MemorialController } from './memorial.controller';
import { MemorialService } from './memorial.service';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityMarker.name, schema: CityMarkerSchema },
      { name: MemorialMarker.name, schema: MemorialMarkerSchema },
    ]),
    NestjsFormDataModule,
  ],
  controllers: [MemorialController],
  providers: [MemorialService, FileService],
})
export class MemorialModule {}
