import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MemorialMarker,
  MemorialMarkerDocument,
} from '../../schemas/memorialMarker.schema';
import { Model } from 'mongoose';
import { CreateMemorialTypeDto } from '../../dto/createMemorialType.dto';
import {
  MarkerType,
  MarkerTypeDocument,
} from '../../schemas/markerType.schema';

@Injectable()
export class MemorialTypeService {
  constructor(
    @InjectModel(MemorialMarker.name)
    private memorialMarkerModel: Model<MemorialMarkerDocument>,
    @InjectModel(MarkerType.name)
    private markerTypeModel: Model<MarkerTypeDocument>,
  ) {}

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
