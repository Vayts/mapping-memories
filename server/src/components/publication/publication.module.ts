import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { FileService } from '../file/file.service';
import {
  Publication,
  PublicationSchema,
} from '../../schemas/publication.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService, FileService],
})
export class PublicationModule {}
