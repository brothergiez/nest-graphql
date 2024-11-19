import { Module } from '@nestjs/common';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';
import { HttpClientService } from '../../utils/requests/http-client.service';

@Module({
  providers: [LoginResolver, LoginService, HttpClientService],
})
export class LoginModule {}
