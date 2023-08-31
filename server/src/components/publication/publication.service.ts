import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhotoService } from '../photo/photo.service';
import {
  Publication,
  PublicationDocument,
} from '../../schemas/publication.schema';
import { generateSearchPipeline } from '../../helper/pipeline.helper';

@Injectable()
export class PublicationService {
  constructor(
    private photoService: PhotoService,
    @InjectModel(Publication.name)
    private publicationModel: Model<PublicationDocument>,
  ) {}

  async addPublication(files, dto) {
    const photoData = this.photoService.multiplyUpload(files.photos, 'photo');
    const filesData = this.photoService.multiplyUpload(files.files, 'files');
    const upload = Promise.all([photoData, filesData]);
    upload.then(() => {
      return this.publicationModel.insertMany([
        {
          createdAt: Date.now(),
          title: dto.mainInfo.title,
          type: dto.mainInfo.type,
          description: dto.mainInfo.description,
          photo: dto.mainInfo.photo,
          contentBlocks: dto.contentBlocks,
        },
      ]);
    });
  }

  getFavoritePublication(type: string) {
    const typeMatchPipeline = type ? [{ $match: { type: type } }] : [];

    return this.publicationModel.aggregate([
      ...typeMatchPipeline,
      { $sort: { createdAt: -1 } },
      { $match: { isFavorite: true } },
      { $limit: 3 },
      {
        $project: {
          photo: 1,
          _id: 1,
          description: 1,
          type: 1,
          title: 1,
          createdAt: 1,
        },
      },
    ]);
  }

  async getPublications(limit: number, search: string, type: string) {
    const searchPipeline = generateSearchPipeline(search);

    const typeMatchPipeline = type ? [{ $match: { type: type } }] : [];

    const publicationCount = await this.publicationModel.aggregate([
      ...typeMatchPipeline,
      { $sort: { createdAt: -1 } },
      ...searchPipeline,
    ]);

    const hasMoreContent = Number(limit) <= publicationCount.length;
    const pipeline: any = [
      ...typeMatchPipeline,
      { $sort: { createdAt: -1 } },
      { $skip: limit - 6 },
      { $limit: Number(limit) },
      ...searchPipeline,
      {
        $project: {
          photo: 1,
          _id: 1,
          description: 1,
          type: 1,
          title: 1,
          createdAt: 1,
        },
      },
    ];
    const publication = await this.publicationModel.aggregate(pipeline);

    return {
      hasMoreContent,
      publication,
    };
  }

  getPublication(id) {
    return this.publicationModel.findById(id);
  }
}
