import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateInterviewDTO } from '../../dto/createInterview.dto';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';

@Controller('/publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Post('/add')
  @UseGuards(JwtAuthGuard)
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

  @Post('/edit/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos' }, { name: 'files' }]),
  )
  editPublication(
    @Param('id') id,
    @UploadedFiles()
    files: { photos?: Express.Multer.File[]; files?: Express.Multer.File[] },
    @Body() dto: CreateInterviewDTO,
  ) {
    return this.publicationService.editPublication(id, files, dto);
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

  @Get('/set-favorite/:id')
  setFavoritePublication(@Param('id') id) {
    console.log('ebalo');
    return this.publicationService.setFavoritePublication(id);
  }

  @Get('/remove-favorite/:id')
  removeFavoritePublication(@Param('id') id) {
    return this.publicationService.removeFavoritePublication(id);
  }

  @Get('/get_all')
  getAllPublications(@Query('search') search = '') {
    return this.publicationService.getAllPublications(search);
  }

  @Get('/get-favorite')
  getFavoritePublication(@Query('type') type = '') {
    return this.publicationService.getFavoritePublication(type);
  }

  @Get('/get-recent')
  getRecentPublication(@Query('except') except = '') {
    return this.publicationService.getRecentPublications(except);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deletePublication(@Param('id') id) {
    return this.publicationService.deletePublication(id);
  }
}
