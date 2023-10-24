import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CityMarker, CityMarkerSchema } from '../../schemas/cityMarker.schema';
import {
  MemorialMarker,
  MemorialMarkerSchema,
} from '../../schemas/memorialMarker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityMarker.name, schema: CityMarkerSchema },
      { name: MemorialMarker.name, schema: MemorialMarkerSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
