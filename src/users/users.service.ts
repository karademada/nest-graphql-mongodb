import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.interface';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete.user.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user = new this.userModel({
      userId: uuidv4(),
      ...createUserData,
    });
    return user.save();
  }

  public async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { userId: updateUserData.userId },
      updateUserData,
      { new: true },
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.userModel.findOne({ userId: getUserArgs.userId });
  }

  public async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
    if (!getUsersArgs.userIds || getUsersArgs.userIds.length === 0) {
      return this.userModel.find();
    }
    return this.userModel.find({ userId: { $in: getUsersArgs.userIds } });
  }

  public async deleteUser(deleteUserData: DeleteUserInput): Promise<User> {
    const user = await this.userModel.findOneAndDelete({
      userId: deleteUserData.userId,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
