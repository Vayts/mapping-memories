import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MemorialMarker,
  MemorialMarkerDocument,
} from '../../schemas/memorialMarker.schema';
import { Model } from 'mongoose';
import {
  CityMarker,
  CityMarkerDocument,
} from '../../schemas/cityMarker.schema';
import { CreateCityMarkerDto } from '../../dto/createCityMarker.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(MemorialMarker.name)
    private memorialMarkerModel: Model<MemorialMarkerDocument>,
    @InjectModel(CityMarker.name)
    private cityMarkerModel: Model<CityMarkerDocument>,
  ) {}

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

  async addCityMarker(values: CreateCityMarkerDto) {
    const result = await this.cityMarkerModel.insertMany([
      {
        ...values,
        icon: 'city.svg',
      },
    ]);

    return result[0];
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
}
