import { Injectable, HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class HttpClientService {
  async request(url: string, method: 'GET' | 'POST', data = {}, headers = {}) {
    try {
      const response = await axios({
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Ambil status dan data error dari response microservice
        const { status, data } = error.response || {};
        throw new HttpException(data, status || 500);
      }
      throw new HttpException({ message: 'Unexpected error occurred' }, 500);
    }
  }
}
