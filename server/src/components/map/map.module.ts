import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MemorialMarker,
  MemorialMarkerSchema,
} from '../../schemas/memorialMarker.schema';
import { CityMarker, CityMarkerSchema } from '../../schemas/cityMarker.schema';
import { MarkerType, MarkerTypeSchema } from '../../schemas/markerType.schema';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MemorialMarker.name, schema: MemorialMarkerSchema },
      { name: CityMarker.name, schema: CityMarkerSchema },
      { name: MarkerType.name, schema: MarkerTypeSchema },
    ]),
  ],
  controllers: [MapController],
  providers: [MapService, FileService],
})
export class MapModule {}
