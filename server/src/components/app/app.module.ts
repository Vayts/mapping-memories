import { Module } from '@nestjs/common';
import * as process from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PublicationModule } from '../publication/publication.module';
import { FileModule } from '../file/file.module';
import { MapModule } from '../map/map.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CityModule } from '../city/city.module';
import { MemorialModule } from '../memorial/memorial.module';
import { MemorialTypeModule } from '../memorialType/memorialType.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../..', 'client/public/img'),
      exclude: ['/api/(.*)'],
      serveRoot: '/img',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../..', 'client/dist'),
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MapModule,
    FileModule,
    PublicationModule,
    AuthModule,
    CityModule,
    MemorialModule,
    MemorialTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
