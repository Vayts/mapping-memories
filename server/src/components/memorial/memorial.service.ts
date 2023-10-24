import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MemorialMarker,
  MemorialMarkerDocument,
} from '../../schemas/memorialMarker.schema';
import mongoose, { Model } from 'mongoose';
import {
  CityMarker,
  CityMarkerDocument,
} from '../../schemas/cityMarker.schema';
import { CreateMemorialDto } from '../../dto/createMemorial.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class MemorialService {
  constructor(
    private fileService: FileService,
    @InjectModel(MemorialMarker.name)
    private memorialMarkerModel: Model<MemorialMarkerDocument>,
    @InjectModel(CityMarker.name)
    private cityMarkerModel: Model<CityMarkerDocument>,
  ) {}

  getAllMemorials() {
    return this.memorialMarkerModel.aggregate([
      {
        $lookup: {
          from: 'citymarkers',
          localField: 'city_id',
          foreignField: '_id',
          as: 'cityInfo',
        },
      },
      {
        $addFields: {
          city: { $arrayElemAt: ['$cityInfo.name.uk', 0] },
        },
      },
      {
        $project: {
          cityInfo: 0,
        },
      },
    ]);
  }

  async editMemorialMarker(files, values: CreateMemorialDto, id) {
    if (files?.photos) {
      await this.fileService.multiplyUpload(files.photos, 'photo');
    }

    const result = await this.memorialMarkerModel.findByIdAndUpdate(
      id,
      {
        ...values,
        city_id: values.city_id
          ? new mongoose.Types.ObjectId(values.city_id)
          : null,
        type_id: values.type_id
          ? new mongoose.Types.ObjectId(values.type_id)
          : null,
      },
      { new: true },
    );

    return result;
  }

  async addMemorial(files, dto) {
    if (files?.photos) {
      await this.fileService.multiplyUpload(files.photos, 'photo');
    }

    const result = await this.memorialMarkerModel.insertMany([
      {
        ...dto,
        city_id: dto.city_id ? new mongoose.Types.ObjectId(dto.city_id) : null,
        type_id: dto.type_id ? new mongoose.Types.ObjectId(dto.type_id) : null,
      },
    ]);

    return result[0];
  }
  getMemorial(id) {
    return this.memorialMarkerModel.findById(id);
  }

  deleteMemorial(id) {
    return this.memorialMarkerModel.findByIdAndDelete(id);
  }
}
