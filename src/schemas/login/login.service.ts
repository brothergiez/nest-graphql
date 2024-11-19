import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../utils/requests/http-client.service';
import { LoginData } from './dto/login-response.dto';

@Injectable()
export class LoginService {
  private readonly loginUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClientService,
  ) {
    const host = this.configService.get<string>('AUTH_SERVICE_HOST');
    this.loginUrl = `${host}/auth/login`;
  }

  async login(email: string, password: string): Promise<LoginData> {
    return await this.httpClient.request(this.loginUrl, 'POST', {
      email,
      password,
    });
  }
}
