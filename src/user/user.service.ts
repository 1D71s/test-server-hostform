import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from "../auth/dto/create-user-dto";
import {User, UserDocument} from "./user.model";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email } = createUserDto;
        const existingUser = await this.getByEmail(email);

        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async getByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email });
    }
}