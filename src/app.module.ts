import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { APP_GUARD } from "@nestjs/core";
import { JwtStrategy } from "@src/auth/strategies/jwt-strategy";
import {JwtModule} from "@nestjs/jwt";
import { DomainModule } from './domain/domain.module';


@Module({
  imports: [
      AuthModule,
      UserModule,
      MongooseModule.forRoot(process.env.DATABASE_URL),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY,
          signOptions: {
              expiresIn: '24h'
          }
      }),
      DomainModule
  ],
  controllers: [],
  providers: [
      {
          provide: APP_GUARD,
          useClass: JwtStrategy,
      },
  ],
})
export class AppModule {}