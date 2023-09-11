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
import { MapService } from './map.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateMemorialDto } from '../../dto/createMemorial.dto';
import { CreateMemorialTypeDto } from '../../dto/createMemorialType.dto';
import { ROUTES } from '../../constants/routes';
@Controller(ROUTES.MAP.DEFAULT)
export class MapController {
  constructor(private mapService: MapService) {}

  @Get(ROUTES.MAP.GET_INFO)
  getInfo(@Query() query: Record<string, string>) {
    const filters = query.filters.split('_%_').filter((item) => item);
    return this.mapService.getInfo(filters);
  }

  @Get(ROUTES.MAP.GET_ALL_MEMORIALS)
  getAllMemorials() {
    return this.mapService.getAllMemorials();
  }

  @Get(ROUTES.MAP.GET_ALL_MEMORIAL_TYPES)
  getAllMemorialTypes() {
    return this.mapService.getAllTypes();
  }

  @Post(ROUTES.MAP.ADD_MEMORIAL_TYPE)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  addMemorialType(@Body() dto: CreateMemorialTypeDto) {
    return this.mapService.addMemorialType(dto);
  }

  @Post(ROUTES.MAP.EDIT_MEMORIAL_TYPE)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  editMemorialType(@Body() dto: CreateMemorialTypeDto, @Param('id') id) {
    return this.mapService.editMemorialType(dto, id);
  }

  @Delete(ROUTES.MAP.DELETE_MEMORIAL_TYPE)
  @UseGuards(JwtAuthGuard)
  deleteMemorialType(@Param('id') id) {
    return this.mapService.deleteMemorialType(id);
  }

  @Get(ROUTES.MAP.GET_MEMORIAL)
  getMemorial(@Param('id') id) {
    return this.mapService.getMemorial(id);
  }

  @Delete(ROUTES.MAP.DELETE_MEMORIAL_MARKER)
  @UseGuards(JwtAuthGuard)
  deleteMemorial(@Param('id') id) {
    return this.mapService.deleteMemorial(id);
  }

  @Post(ROUTES.MAP.ADD_MEMORIAL_MARKER)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos' }]))
  addMemorialMarker(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() dto: CreateMemorialDto,
  ) {
    return this.mapService.addMemorial(files, dto);
  }

  @Post(ROUTES.MAP.EDIT_MEMORIAL)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos' }]))
  editMemorialMarker(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() dto: CreateMemorialDto,
    @Param('id') id,
  ) {
    return this.mapService.editMemorialMarker(files, dto, id);
  }
}
