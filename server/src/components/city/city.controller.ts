import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ROUTES } from '../../constants/routes';
import { CityService } from './city.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
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
  addCityMarker(@Body() dto: CreateCityMarkerDto) {
    return this.cityService.addCityMarker(dto);
  }

  @Put(ROUTES.CITY.EDIT)
  @UseGuards(JwtAuthGuard)
  editCityMarker(@Body() dto: CreateCityMarkerDto, @Param('id') id) {
    return this.cityService.editCityMarker(dto, id);
  }

  @Delete(ROUTES.CITY.DELETE)
  @UseGuards(JwtAuthGuard)
  deleteCityMarker(@Param('id') id) {
    return this.cityService.deleteCityMarker(id);
  }
}
