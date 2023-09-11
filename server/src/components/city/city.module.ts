import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../token/token.module';
import { CityMarker, CityMarkerSchema } from '../../schemas/cityMarker.schema';
import {
  MemorialMarker,
  MemorialMarkerSchema,
} from '../../schemas/memorialMarker.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityMarker.name, schema: CityMarkerSchema },
      { name: MemorialMarker.name, schema: MemorialMarkerSchema },
    ]),
    JwtModule.register({}),
    TokenModule,
    NestjsFormDataModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
