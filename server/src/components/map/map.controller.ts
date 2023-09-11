import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { MapService } from './map.service';
import { ROUTES } from '../../constants/routes';
@Controller(ROUTES.MAP.DEFAULT)
export class MapController {
  constructor(private mapService: MapService) {}

  @Get(ROUTES.MAP.GET_INFO)
  getInfo(@Query() query: Record<string, string>) {
    const filters = query.filters.split('_%_').filter((item) => item);
    return this.mapService.getInfo(filters);
  }
}
