import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { HttpClientService } from '../../utils/requests/http-client.service';

@Module({
  providers: [RoleResolver, RoleService, HttpClientService],
})
export class RoleModule {}
