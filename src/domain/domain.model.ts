import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsIP, IsAlphanumeric, IsInt, Min, Max } from 'class-validator';
import {User} from "@src/user/user.model";

export type DomainDocument = HydratedDocument<Domain>;

@Schema()
export class Domain {
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    domainName: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsIP('4', { message: 'Invalid IPv4 address' })
    serverIpAddress: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    sshUsername: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    sshPassword: string;

    @Prop({ required: true })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(65535)
    port: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    ownerId: User;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
