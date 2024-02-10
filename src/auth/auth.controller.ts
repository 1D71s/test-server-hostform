import {Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "./dto/create-user-dto";
import {LoginDto} from "./dto/login-dto";
import {BearerToken, Message} from "./interfaces";
import { Public } from "@src/auth/guards/public-guard";

@Controller('auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<BearerToken> {
        try {
            return this.authService.login(loginDto);
        } catch (err) {
            throw err;
        }
    }

    @Post('/register')
    register(@Body() createUserDto: CreateUserDto): Promise<Message> {
        try {
            return this.authService.register(createUserDto);
        } catch (err) {
            throw err;
        }
    }
}