import { UserDocument } from '../schemas/user.schema';

export class SimpleUserDto {
  constructor(user: UserDocument) {
    this.login = user.login;
    this._id = user._id;
  }
  _id: string;
  login: string;
}
