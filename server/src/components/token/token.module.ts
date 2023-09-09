import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../../schemas/token.schema';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [TokenService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    TokenModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [TokenService],
})
export class TokenModule {}
