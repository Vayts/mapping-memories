import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import {
  MemorialMarker,
  MemorialMarkerDocument,
} from '../../schemas/memorialMarker.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  CityMarker,
  CityMarkerDocument,
} from '../../schemas/cityMarker.schema';
import {
  MarkerType,
  MarkerTypeDocument,
} from '../../schemas/markerType.schema';
import { CreateCityMarkerDto } from '../../dto/createCityMarker.dto';
import { FileService } from '../photo/file.service';
import { CreateMemorialDto } from '../../dto/createMemorial.dto';
import { CreateMemorialTypeDto } from '../../dto/createMemorialType.dto';

@Injectable()
export class MapService {
  constructor(
    private photoService: FileService,
    @InjectModel(MemorialMarker.name)
    private memorialMarkerModel: Model<MemorialMarkerDocument>,
    @InjectModel(CityMarker.name)
    private cityMarkerModel: Model<CityMarkerDocument>,
    @InjectModel(MarkerType.name)
    private markerTypeModel: Model<MarkerTypeDocument>,
  ) {}

  async getInfo(filters) {
    const memorials = await this.memorialMarkerModel.aggregate([
      {
        $match: {
          type_id: filters.length
            ? {
                $in: [
                  ...filters.map((item) => new mongoose.Types.ObjectId(item)),
                ],
              }
            : { $exists: true },
        },
      },
    ]);
    const cities = await this.getCities(filters);
    const types = await this.getTypes();
    return {
      memorials,
      cities,
      types,
    };
  }

  getCities(filters) {
    return this.cityMarkerModel.aggregate([
      {
        $lookup: {
          from: 'memorialmarkers',
          let: { cityId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$city_id', '$$cityId'] },
                    filters.length
                      ? {
                          $in: [
                            '$type_id',
                            filters.map(
                              (item) => new mongoose.Types.ObjectId(item),
                            ),
                          ],
                        }
                      : true,
                  ],
                },
              },
            },
          ],
          as: 'memorials',
        },
      },
      {
        $project: {
          name: 1,
          icon: 1,
          lat: 1,
          lng: 1,
          count: {
            $cond: {
              if: { $isArray: '$memorials' },
              then: { $size: '$memorials' },
              else: 0,
            },
          },
        },
      },
      {
        $match: {
          count: { $gte: 1 },
        },
      },
    ]);
  }

  getAllCityMarkers() {
    return this.cityMarkerModel.aggregate([
      {
        $lookup: {
          from: 'memorialmarkers',
          let: { cityId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$city_id', '$$cityId'] }, true],
                },
              },
            },
          ],
          as: 'memorials',
        },
      },
      {
        $project: {
          name: 1,
          icon: 1,
          lat: 1,
          lng: 1,
          count: {
            $cond: {
              if: { $gt: [{ $size: '$memorials' }, 0] },
              then: { $size: '$memorials' },
              else: 0,
            },
          },
        },
      },
    ]);
  }

  addCityMarker(values: CreateCityMarkerDto) {
    return this.cityMarkerModel.insertMany([
      {
        ...values,
        icon: 'city.svg',
      },
    ]);
  }

  async editCityMarker(values: CreateCityMarkerDto, id) {
    const result = await this.cityMarkerModel.findByIdAndUpdate(
      id,
      {
        ...values,
      },
      { new: true },
    );

    return result;
  }

  async deleteCityMarker(id: string) {
    await this.memorialMarkerModel.updateMany(
      { city_id: id },
      { city_id: null },
    );

    return this.cityMarkerModel.findByIdAndDelete(id);
  }

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
  getMemorial(id) {
    return this.memorialMarkerModel.findById(id);
  }

  deleteMemorial(id) {
    return this.memorialMarkerModel.findByIdAndDelete(id);
  }

  getTypes() {
    return this.markerTypeModel.aggregate([
      {
        $lookup: {
          from: 'memorialmarkers',
          let: { type_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$type_id', '$$type_id'] },
              },
            },
          ],
          as: 'markersInfo',
        },
      },
      {
        $addFields: {
          count: { $size: '$markersInfo' },
        },
      },
      {
        $match: {
          count: { $gte: 1 },
        },
      },
      {
        $project: {
          markersInfo: 0,
        },
      },
    ]);
  }

  getAllTypes() {
    return this.markerTypeModel.aggregate([
      {
        $lookup: {
          from: 'memorialmarkers',
          let: { type_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$type_id', '$$type_id'] },
              },
            },
          ],
          as: 'markersInfo',
        },
      },
      {
        $addFields: {
          count: { $size: '$markersInfo' },
        },
      },
      {
        $project: {
          markersInfo: 0,
        },
      },
    ]);
  }

  async addMemorial(files, dto) {
    if (files?.photos) {
      await this.photoService.multiplyUpload(files.photos, 'photo');
    }

    return this.memorialMarkerModel.insertMany([
      {
        ...dto,
        city_id: dto.city_id ? new mongoose.Types.ObjectId(dto.city_id) : null,
        type_id: dto.type_id ? new mongoose.Types.ObjectId(dto.type_id) : null,
      },
    ]);
  }

  async editMemorialMarker(files, values: CreateMemorialDto, id) {
    if (files?.photos) {
      await this.photoService.multiplyUpload(files.photos, 'photo');
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

  addMemorialType(values: CreateMemorialTypeDto) {
    return this.markerTypeModel.insertMany([
      {
        ...values,
      },
    ]);
  }

  async editMemorialType(values: CreateMemorialTypeDto, id) {
    const result = await this.markerTypeModel.findByIdAndUpdate(
      id,
      { ...values },
      { new: true },
    );

    return result;
  }

  async deleteMemorialType(id) {
    return this.markerTypeModel.findByIdAndDelete(id);
  }
}
