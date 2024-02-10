import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateDomainDto } from "@src/domain/dto/create-domain-dto";
import { InjectModel } from "@nestjs/mongoose";
import { Domain, DomainDocument } from "@src/domain/domain.model";
import {Model, Types} from "mongoose";
import { UserDocument } from "@src/user/user.model";

@Injectable()
export class DomainService {
    constructor(@InjectModel(Domain.name) private domainModel: Model<DomainDocument>) {}

    async create(form: CreateDomainDto, user: UserDocument): Promise<DomainDocument> {
        const domainWithAuthor = { ...form, ownerId: user._id }
        const createdDomain = new this.domainModel(domainWithAuthor);
        return await createdDomain.save();
    }

    async getAll(user: UserDocument): Promise<DomainDocument[]> {
        return await this.domainModel.find({ ownerId: user._id }).exec();
    }


    async getOne(_id: string): Promise<DomainDocument> {
        if (!Types.ObjectId.isValid(_id)) {
            throw new NotFoundException('Invalid domain ID');
        }
        return await this.domainModel.findById(_id).exec();
    }



    async delete(domainId: string, user: UserDocument): Promise<DomainDocument> {

        const domain = await this.getOne(domainId);

        if (!domain) {
            throw new NotFoundException('Domain does not exist.');
        }

        if (user._id.toString() !== domain.ownerId.toString()) {
            throw new UnauthorizedException('You are not authorized to delete this domain.');
        }

        return await this.domainModel.findByIdAndDelete(domainId).exec();
    }
}