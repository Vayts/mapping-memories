import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../../schemas/token.schema';
import { TokenService } from './token.service';

@Global()
@Module({
  controllers: [],
  providers: [TokenService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    TokenModule,
  ],
  exports: [TokenService],
})
export class TokenModule {}
