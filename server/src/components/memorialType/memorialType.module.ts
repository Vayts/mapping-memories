import { Module } from '@nestjs/common';
import { MemorialTypeService } from './memorialType.service';
import { MemorialTypeController } from './memorialType.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MemorialMarker,
  MemorialMarkerSchema,
} from '../../schemas/memorialMarker.schema';
import { MarkerType, MarkerTypeSchema } from '../../schemas/markerType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarkerType.name, schema: MarkerTypeSchema },
      { name: MemorialMarker.name, schema: MemorialMarkerSchema },
    ]),
  ],
  controllers: [MemorialTypeController],
  providers: [MemorialTypeService],
})
export class MemorialTypeModule {}
