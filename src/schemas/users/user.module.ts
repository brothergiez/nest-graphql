import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { HttpClientService } from '../../utils/requests/http-client.service';

@Module({
  providers: [UserResolver, UserService, HttpClientService],
})
export class UserModule {}
