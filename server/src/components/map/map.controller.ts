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
import { CreateCityMarkerDto } from '../../dto/createCityMarker.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateMemorialDto } from '../../dto/createMemorial.dto';
@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('/get-info')
  getInfo(@Query() query: Record<string, string>) {
    const filters = query.filters.split('_%_').filter((item) => item);
    return this.mapService.getInfo(filters);
  }

  @Get('/get-city-markers')
  @UseGuards(JwtAuthGuard)
  getMarkers() {
    return this.mapService.getAllCityMarkers();
  }

  @Post('/add-city-marker')
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  addCityMarker(@Body() dto: CreateCityMarkerDto) {
    return this.mapService.addCityMarker(dto);
  }

  @Post('/edit-city-marker/:id')
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  editCityMarker(@Body() dto: CreateCityMarkerDto, @Param('id') id) {
    return this.mapService.editCityMarker(dto, id);
  }

  @Delete('/delete-city-marker/:id')
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  deleteCityMarker(@Param('id') id) {
    return this.mapService.deleteCityMarker(id);
  }

  @Get('/get-memorial-markers')
  getAllMemorials() {
    return this.mapService.getAllMemorials();
  }

  @Get('/get-memorial-types')
  getAllMemorialTypes() {
    return this.mapService.getTypes();
  }

  @Get('/get-memorial/:id')
  getMemorial(@Param('id') id) {
    return this.mapService.getMemorial(id);
  }

  @Delete('/delete-memorial/:id')
  @UseGuards(JwtAuthGuard)
  deleteMemorial(@Param('id') id) {
    return this.mapService.deleteMemorial(id);
  }

  @Post('/add-memorial-marker')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos' }]))
  addMemorialMarker(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() dto: CreateMemorialDto,
  ) {
    return this.mapService.addMemorial(files, dto);
  }

  @Post('/edit-memorial-marker/:id')
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
