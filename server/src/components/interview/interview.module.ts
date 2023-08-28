import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { PhotoService } from '../photo/photo.service';
import {
  Publication,
  PublicationSchema,
} from '../../schemas/publication.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService, PhotoService],
})
export class InterviewModule {}
