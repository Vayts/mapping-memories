import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import { ROUTES } from '../../constants/routes';

@Controller(ROUTES.FILE.DEFAULT)
export class FileController {
  constructor(private photoService: FileService) {}

  @Get(ROUTES.FILE.DOWNLOAD_PHOTO)
  async downloadPhoto(@Query() query, @Res() res: Response) {
    try {
      const photoData = await this.photoService.downloadFileFromAws(
        'photo',
        query.id,
      );
      res.contentType('image/jpeg');
      res.send(photoData);
    } catch (error) {
      res.status(500).send(`Error retrieving photo: ${error.message}`);
    }
  }

  @Get(ROUTES.FILE.DOWNLOAD_PDF)
  async downloadFile(@Query() query, @Res() res: Response) {
    try {
      const fileData = await this.photoService.downloadFileFromAws(
        'files',
        query.id,
      );
      res.contentType('application/pdf');
      res.send(fileData);
    } catch (error) {
      res.status(500).send(`Error retrieving file: ${error.message}`);
    }
  }
}
