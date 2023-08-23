import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
