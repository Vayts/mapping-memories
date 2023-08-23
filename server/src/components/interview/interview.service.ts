import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview, InterviewDocument } from '../../schemas/interview.schema';
import { Model } from 'mongoose';
import { PhotoService } from '../photo/photo.service';

@Injectable()
export class InterviewService {
  constructor(
    private photoService: PhotoService,
    @InjectModel(Interview.name)
    private interviewModel: Model<InterviewDocument>,
  ) {}

  async addInterview(files, dto) {
    const data = await this.photoService.multiplyUpload(files, 'photo');
    if (data) {
      return this.interviewModel.insertMany([
        {
          createdAt: Date.now(),
          title: dto.mainInfo.title,
          description: dto.mainInfo.description,
          photo: dto.mainInfo.photo,
          contentBlocks: dto.contentBlocks,
        },
      ]);
    }
  }

  getAllInterview() {
    return this.interviewModel.find({});
  }
}
