import { Injectable, UnauthorizedException } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { CreateUserDto } from "./dto/create-user-dto";
import {BearerToken, Message} from "./interfaces";
import {LoginDto} from "@src/auth/dto/login-dto";
import {UserDocument} from "@src/user/user.model";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<BearerToken> {
        const { email, password } = loginDto;
        const user = await this.userService.getByEmail(email);

        if (!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException('Incorrect email or password.');
        }

        return this.generateToken(user);
    }

    async register(createUserDto: CreateUserDto): Promise<Message> {
        const { password } = createUserDto;
        const hashedPassword = this.hashPassword(password);

        const userWithHashedPassword = { ...createUserDto, password: hashedPassword };

        await this.userService.create(userWithHashedPassword);

        return { message: 'Registration successful.' };
    }

    private async generateToken(user: UserDocument): Promise<BearerToken> {
        const { email, _id } = user
        const accessToken = this.jwtService.sign({ email, _id });

        return { token: accessToken };
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
