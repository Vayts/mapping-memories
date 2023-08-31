import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateInterviewDTO } from '../../dto/createInterview.dto';

@Controller('/publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Post('/add')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos' }, { name: 'files' }]),
  )
  addPublication(
    @UploadedFiles()
    files: { photos?: Express.Multer.File[]; files?: Express.Multer.File[] },
    @Body() dto: CreateInterviewDTO,
  ) {
    return this.publicationService.addPublication(files, dto);
  }

  @Get('/get')
  getPublications(
    @Query('limit') limit = 9,
    @Query('search') search = '',
    @Query('type') type = '',
  ) {
    return this.publicationService.getPublications(limit, search, type);
  }

  @Get('/get/:id')
  getPublication(@Param('id') id) {
    return this.publicationService.getPublication(id);
  }

  @Get('/get-favorite')
  getFavoritePublication(@Query('type') type = '') {
    return this.publicationService.getFavoritePublication(type);
  }
}
