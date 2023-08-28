import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhotoService } from '../photo/photo.service';
import { LANGUAGES } from '../../constants/languages';
import {
  Publication,
  PublicationDocument,
} from '../../schemas/publication.schema';

@Injectable()
export class InterviewService {
  constructor(
    private photoService: PhotoService,
    @InjectModel(Publication.name)
    private publicationModel: Model<PublicationDocument>,
  ) {}

  async addInterview(files, dto) {
    const data = await this.photoService.multiplyUpload(files, 'photo');
    if (data) {
      return this.publicationModel.insertMany([
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
    return this.publicationModel.aggregate([
      { $match: { type: 'interview' } },
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

    const interviewsCount = await this.publicationModel.aggregate([
      { $match: { type: 'interview' } },
      { $sort: { createdAt: -1 } },
      ...searchPipeline,
    ]);

    const hasMoreInterviews = Number(limit) <= interviewsCount.length;
    const pipeline: any = [
      { $match: { type: 'interview' } },
      { $sort: { createdAt: -1 } },
      { $skip: limit - 6 },
      { $limit: Number(limit) },
      ...searchPipeline,
    ];
    const interviews = await this.publicationModel.aggregate(pipeline);

    return {
      hasMoreInterviews,
      interviews,
    };
  }
}
