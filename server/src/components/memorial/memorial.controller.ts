import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ROUTES } from '../../constants/routes';
import { MemorialService } from './memorial.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateMemorialDto } from '../../dto/createMemorial.dto';

@Controller(ROUTES.MEMORIAL.DEFAULT)
export class MemorialController {
  constructor(private memorialService: MemorialService) {}

  @Get(ROUTES.MEMORIAL.GET_ALL)
  getAllMemorials() {
    return this.memorialService.getAllMemorials();
  }

  @Get(ROUTES.MEMORIAL.GET)
  getMemorial(@Param('id') id) {
    return this.memorialService.getMemorial(id);
  }

  @Delete(ROUTES.MEMORIAL.DELETE)
  @UseGuards(JwtAuthGuard)
  deleteMemorial(@Param('id') id) {
    return this.memorialService.deleteMemorial(id);
  }

  @Post(ROUTES.MEMORIAL.ADD)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos' }]))
  addMemorialMarker(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() dto: CreateMemorialDto,
  ) {
    return this.memorialService.addMemorial(files, dto);
  }

  @Post(ROUTES.MEMORIAL.EDIT)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos' }]))
  editMemorialMarker(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() dto: CreateMemorialDto,
    @Param('id') id,
  ) {
    return this.memorialService.editMemorialMarker(files, dto, id);
  }
}
