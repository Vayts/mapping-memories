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
import { MemorialTypeService } from './memorialType.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateMemorialTypeDto } from '../../dto/createMemorialType.dto';

@Controller(ROUTES.MEMORIAL_TYPE.DEFAULT)
export class MemorialTypeController {
  constructor(private memorialTypeService: MemorialTypeService) {}

  @Get(ROUTES.MEMORIAL_TYPE.GET_ALL)
  getAllMemorialTypes() {
    return this.memorialTypeService.getAllTypes();
  }

  @Post(ROUTES.MEMORIAL_TYPE.ADD)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  addMemorialType(@Body() dto: CreateMemorialTypeDto) {
    return this.memorialTypeService.addMemorialType(dto);
  }

  @Post(ROUTES.MEMORIAL_TYPE.EDIT)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  editMemorialType(@Body() dto: CreateMemorialTypeDto, @Param('id') id) {
    return this.memorialTypeService.editMemorialType(dto, id);
  }

  @Delete(ROUTES.MEMORIAL_TYPE.DELETE)
  @UseGuards(JwtAuthGuard)
  deleteMemorialType(@Param('id') id) {
    return this.memorialTypeService.deleteMemorialType(id);
  }
}
