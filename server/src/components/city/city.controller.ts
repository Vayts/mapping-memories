import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ROUTES } from '../../constants/routes';
import { CityService } from './city.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateCityMarkerDto } from '../../dto/createCityMarker.dto';

@Controller(ROUTES.CITY.DEFAULT)
export class CityController {
  constructor(private cityService: CityService) {}

  @Get(ROUTES.CITY.GET)
  @UseGuards(JwtAuthGuard)
  getMarkers() {
    return this.cityService.getAllCityMarkers();
  }

  @Post(ROUTES.CITY.ADD)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  addCityMarker(@Body() dto: CreateCityMarkerDto) {
    return this.cityService.addCityMarker(dto);
  }

  @Post(ROUTES.CITY.EDIT)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  editCityMarker(@Body() dto: CreateCityMarkerDto, @Param('id') id) {
    return this.cityService.editCityMarker(dto, id);
  }

  @Delete(ROUTES.CITY.DELETE)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  deleteCityMarker(@Param('id') id) {
    return this.cityService.deleteCityMarker(id);
  }
}
