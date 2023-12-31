import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateInterviewDTO } from '../../dto/createInterview.dto';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { ROUTES } from '../../constants/routes';
import { ValidPublicationIdGuard } from '../../guards/ValidPublicationId.guard';

@Controller(ROUTES.PUBLICATION.DEFAULT)
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Post(ROUTES.PUBLICATION.ADD)
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

  @Post(ROUTES.PUBLICATION.EDIT)
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

  @Get(ROUTES.PUBLICATION.GET)
  getPublications(
    @Query('limit') limit = 9,
    @Query('search') search = '',
    @Query('type') type = '',
  ) {
    return this.publicationService.getPublications(limit, search, type);
  }

  @Get(ROUTES.PUBLICATION.LOAD_MORE)
  getFirstLoadPublications(
    @Query('limit') limit = 9,
    @Query('search') search = '',
    @Query('type') type = '',
  ) {
    return this.publicationService.loadMorePublications(limit, search, type);
  }

  @Get(ROUTES.PUBLICATION.GET_CURRENT)
  getPublication(@Param('id') id) {
    return this.publicationService.getPublication(id);
  }

  @Put(ROUTES.PUBLICATION.SET_FAVORITE)
  setFavoritePublication(@Param('id') id) {
    return this.publicationService.setFavoritePublication(id);
  }

  @Put(ROUTES.PUBLICATION.REMOVE_FAVORITE)
  removeFavoritePublication(@Param('id') id) {
    return this.publicationService.removeFavoritePublication(id);
  }

  @Get(ROUTES.PUBLICATION.GET_ALL)
  getAllPublications(@Query('search') search = '') {
    return this.publicationService.getAllPublications(search);
  }

  @Get(ROUTES.PUBLICATION.GET_ADDITIONAL)
  @UseGuards(ValidPublicationIdGuard)
  getAdditionalPublication(@Query('publication_id') except = '') {
    return this.publicationService.getAdditionalPublications(except);
  }

  @Delete(ROUTES.PUBLICATION.DELETE)
  @UseGuards(JwtAuthGuard)
  deletePublication(@Param('id') id) {
    return this.publicationService.deletePublication(id);
  }
}
