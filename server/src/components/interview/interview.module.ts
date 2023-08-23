import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { Interview, InterviewSchema } from '../../schemas/interview.schema';
import { PhotoService } from '../photo/photo.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService, PhotoService],
})
export class InterviewModule {}
