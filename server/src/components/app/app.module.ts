import { Module } from '@nestjs/common';
import * as process from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PublicationModule } from '../publication/publication.module';
import { FileModule } from '../photo/file.module';
import { MapModule } from '../map/map.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../..', 'client/public/img'),
      exclude: ['/api/(.*)'],
      serveRoot: '/img',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MapModule,
    FileModule,
    PublicationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
