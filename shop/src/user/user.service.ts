import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    _getUserDetails(user: UserDocument){
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}
