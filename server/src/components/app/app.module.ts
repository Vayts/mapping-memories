import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from '../map/map.module';
import * as process from 'process';
import { PhotoModule } from '../photo/photo.module';
import { PublicationModule } from '../publication/publication.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MapModule,
    PhotoModule,
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
