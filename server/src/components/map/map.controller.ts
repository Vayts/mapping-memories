import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';
@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('/get-info')
  getInfo(@Query() query: Record<string, string>) {
    const filters = query.filters.split('_%_').filter((item) => item);
    return this.mapService.getInfo(filters);
  }
}
