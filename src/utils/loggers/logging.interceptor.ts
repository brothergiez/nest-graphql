import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { logger } from './logger';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const isGraphQL = context.getType<'graphql'>() === 'graphql';
  
      const request = isGraphQL
        ? context.getArgByIndex(2)?.request // GraphQL: Argumen ke-3 adalah konteks
        : context.switchToHttp().getRequest(); // HTTP: Ambil dari switchToHttp()
  
      if (!request) {
        logger.warn('Request is undefined. Skipping request logging.\n');
        return next.handle();
      }
  
      const { method = 'GRAPHQL', url = 'N/A', headers, body } = request;
      const sanitizedHeaders = this.sanitize(headers);
      const sanitizedBody = this.sanitize(body);
  
      const startTime = Date.now();
  
      return next.handle().pipe(
        tap((response) => {
          const duration = Date.now() - startTime;
          if (response && typeof response.success !== 'undefined') {
            if (response.success) {
              logger.info(
                `Request: ${method} ${url} | Headers: ${JSON.stringify(
                  sanitizedHeaders,
                )} | Body: ${JSON.stringify(sanitizedBody)} | Response: ${JSON.stringify(
                  this.sanitize(response),
                )} | Duration: ${duration}ms\n`,
              );
            } else {
              logger.error(
                `Request: ${method} ${url} | Headers: ${JSON.stringify(
                  sanitizedHeaders,
                )} | Body: ${JSON.stringify(sanitizedBody)} | Response Error: ${JSON.stringify(
                  this.sanitize(response),
                )} | Status: ${response.error.statusCode} | Duration: ${duration}ms\n`,
              );
            }
          } else {
            logger.warn(
              `Request: ${method} ${url} | Headers: ${JSON.stringify(
                sanitizedHeaders,
              )} | Body: ${JSON.stringify(sanitizedBody)} | Response: ${JSON.stringify(
                this.sanitize(response),
              )} | Duration: ${duration}ms\n`,
            );
          }
        }),
      );
    }
  
    private sanitize(data: any): any {
      if (!data) return data;
      const sensitiveKeys = ['password', 'token', 'authorization'];
      return JSON.parse(
        JSON.stringify(data, (key, value) => {
          if (sensitiveKeys.includes(key.toLowerCase())) {
            return '***';
          }
          return value;
        }),
      );
    }
  }
  