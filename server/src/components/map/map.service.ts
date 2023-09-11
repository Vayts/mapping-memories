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
import { FileService } from '../file/file.service';

@Injectable()
export class MapService {
  constructor(
    private fileService: FileService,
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
}
