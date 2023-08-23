import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get('/download')
  async downloadPhoto(@Query() query, @Res() res: Response) {
    try {
      const photoData = await this.photoService.downloadPhotoFromAws(query.id);
      res.contentType('image/jpeg'); // Установите правильный Content-Type для вашего типа фото
      res.send(photoData);
    } catch (error) {
      res.status(500).send(`Error retrieving photo: ${error.message}`);
    }
  }
}
