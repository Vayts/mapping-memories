import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  setAdmin(user) {
    return this.userModel.insertMany([user]);
  }

  async getUserByLogin(login: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ login });
    return user;
  }
}
