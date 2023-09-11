import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MapService } from './map.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { FormDataRequest } from 'nestjs-form-data';
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
}
