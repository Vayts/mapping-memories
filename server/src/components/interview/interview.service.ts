import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interview, InterviewDocument } from '../../schemas/interview.schema';
import { Model } from 'mongoose';
import { PhotoService } from '../photo/photo.service';
import { LANGUAGES } from '../../constants/languages';

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

  getFavoriteInterview() {
    return this.interviewModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $match: { isFavorite: true } },
      { $limit: 3 },
    ]);
  }

  async getInterview(limit: number, search: string) {
    let searchPipeline = [];

    if (search) {
      searchPipeline = [
        {
          $addFields: {
            titleAllLanguages: {
              $concat: LANGUAGES.map((language) => `$title.${language}`).filter(
                (field) => field,
              ),
            },
            descriptionAllLanguages: {
              $concat: LANGUAGES.map(
                (language) => `$description.${language}`,
              ).filter((field) => field),
            },
          },
        },
        {
          $match: {
            $or: [
              {
                titleAllLanguages: {
                  $regex: search,
                  $options: 'i',
                },
              },
              {
                descriptionAllLanguages: {
                  $regex: search,
                  $options: 'i',
                },
              },
            ],
          },
        },
      ];
    }

    const interviewsCount = await this.interviewModel.aggregate([
      { $sort: { createdAt: -1 } },
      ...searchPipeline,
    ]);

    const hasMoreInterviews = Number(limit) <= interviewsCount.length;
    const pipeline: any = [
      { $sort: { createdAt: -1 } },
      { $skip: limit - 6 },
      { $limit: Number(limit) },
      ...searchPipeline,
    ];
    const interviews = await this.interviewModel.aggregate(pipeline);

    return {
      hasMoreInterviews,
      interviews,
    };
  }
}
