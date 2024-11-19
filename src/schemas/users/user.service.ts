import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../utils/requests/http-client.service';
import { User } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly getmeUrl: string;
  private readonly usersUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClientService,
  ) {
    const host = this.configService.get<string>('AUTH_SERVICE_HOST');
    this.getmeUrl = `${host}/users/getme`;
    this.usersUrl = `${host}/users`;
  }

  async getme(authHeader: string): Promise<User> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }

    const response = await this.httpClient.request(
      this.getmeUrl,
      'GET',
      {},
      { Authorization: authHeader },
    );
    return response;
  }

  async getAllUsers(authHeader: string): Promise<User[]> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }
    return await this.httpClient.request(this.usersUrl, 'GET', {}, { Authorization: authHeader });
  }

  async getUserById(id: string, authHeader: string): Promise<User> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }
    const url = `${this.usersUrl}/${id}`;
    return await this.httpClient.request(url, 'GET', {}, { Authorization: authHeader });
  }
}
