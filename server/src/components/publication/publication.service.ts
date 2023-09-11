import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { FileService } from '../file/file.service';
import {
  Publication,
  PublicationDocument,
} from '../../schemas/publication.schema';
import { generateSearchPipeline } from '../../helper/pipeline.helper';

@Injectable()
export class PublicationService {
  constructor(
    private fileService: FileService,
    @InjectModel(Publication.name)
    private publicationModel: Model<PublicationDocument>,
  ) {}

  async addPublication(files, dto) {
    await this.fileService.multiplyUpload(files.photos, 'photo');
    await this.fileService.multiplyUpload(files.files, 'files');

    return this.publicationModel.insertMany([
      {
        createdAt: Date.now(),
        ...dto.mainInfo,
        contentBlocks: [...dto.contentBlocks],
      },
    ]);
  }

  async editPublication(id, files, dto) {
    try {
      await this.fileService.multiplyUpload(files.photos, 'photo');
      await this.fileService.multiplyUpload(files.files, 'files');

      const result = await this.publicationModel.findByIdAndUpdate(
        id,
        {
          ...dto.mainInfo,
          contentBlocks: [...dto.contentBlocks],
        },
        { new: true },
      );

      return result;
    } catch (e) {
      throw new HttpException({ message: 'Error' }, HttpStatus.UNAUTHORIZED);
    }
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

  getRecentPublications(except) {
    return this.publicationModel.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(except) } } },
      { $sort: { createdAt: -1 } },
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
    const searchPipeline = generateSearchPipeline(search.trim());

    const typeMatchPipeline = type ? [{ $match: { type: type } }] : [];

    const publicationCount = await this.publicationModel.aggregate([
      ...typeMatchPipeline,
      { $sort: { createdAt: -1 } },
      ...searchPipeline,
    ]);

    const hasMoreContent = Number(limit) < publicationCount.length;

    const pipeline: any = [
      ...typeMatchPipeline,
      { $sort: { createdAt: -1 } },
      ...searchPipeline,
      { $skip: limit - 6 },
      { $limit: Number(limit) },
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
    const publications = await this.publicationModel.aggregate(pipeline);

    return {
      hasMoreContent,
      publications,
    };
  }

  getAllPublications(search: string) {
    const searchPipeline = generateSearchPipeline(search.trim());

    return this.publicationModel.aggregate([
      ...searchPipeline,
      {
        $project: {
          photo: 1,
          _id: 1,
          description: 1,
          type: 1,
          title: 1,
          createdAt: 1,
          isFavorite: 1,
        },
      },
    ]);
  }

  getPublication(id: string) {
    return this.publicationModel.findById(id);
  }

  setFavoritePublication(id: string) {
    return this.publicationModel.findByIdAndUpdate(
      id,
      {
        isFavorite: true,
      },
      { new: true },
    );
  }

  removeFavoritePublication(id: string) {
    return this.publicationModel.findByIdAndUpdate(
      id,
      {
        isFavorite: false,
      },
      { new: true },
    );
  }

  deletePublication(id: string) {
    return this.publicationModel.deleteOne({ _id: id });
  }
}
