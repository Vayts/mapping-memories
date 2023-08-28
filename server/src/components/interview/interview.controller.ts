import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateInterviewDTO } from '../../dto/createInterview.dto';

@Controller('/interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @Post('/add')
  @UseInterceptors(FilesInterceptor('photos'))
  addInterview(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateInterviewDTO,
  ) {
    return this.interviewService.addInterview(files, dto);
  }

  @Get('/get')
  getInterview(@Query('limit') limit = 9, @Query('search') search = '') {
    return this.interviewService.getInterview(limit, search);
  }

  @Get('/get-favorite')
  getFavoriteInterview() {
    return this.interviewService.getFavoriteInterview();
  }
}
