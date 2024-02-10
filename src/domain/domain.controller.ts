import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateDomainDto } from "@src/domain/dto/create-domain-dto";
import { User } from "y/common/decorators/getData/getUserDecorator";
import { UserDocument } from "@src/user/user.model";
import {DomainDocument} from "@src/domain/domain.model";

@Controller('domain')
export class DomainController {
    constructor(private readonly domainService: DomainService) {}

    @Post('/create')
    create(@Body() createDomainDto: CreateDomainDto, @User() user: UserDocument): Promise<DomainDocument> {
        try {
            return this.domainService.create(createDomainDto, user);
        } catch (err) {
            throw err;
        }
    }

    @Get()
    getUsersDomains(@User() user: UserDocument): Promise<DomainDocument[]> {
        try {
            return this.domainService.getAll(user);
        } catch (err) {
            throw err;
        }
    }

    @Delete(':id')
    async delete(@Param('id') domainId: string, @User() user: UserDocument): Promise<DomainDocument> {
        try {
            return await this.domainService.delete(domainId, user);
        } catch (err) {
            throw err;
        }
    }
}
