import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../utils/requests/http-client.service';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './dto/role.dto';

@Injectable()
export class RoleService {
  private readonly createRoleUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClientService,
  ) {
    const host = this.configService.get<string>('AUTH_SERVICE_HOST');
    this.createRoleUrl = `${host}/roles/create`;
  }

  async createRole(input: CreateRoleInput, authHeader: string): Promise<Role> {
    const result = await this.httpClient.request(this.createRoleUrl, 'POST', input, {
      Authorization: authHeader,
    });
    return result;
  }
}
