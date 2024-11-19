import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LoginModule } from './schemas/login/login.module';
import { UserModule } from './schemas/users/user.module';
import { RoleModule } from './schemas/role/role.module';
import { LoggingInterceptor } from './utils/loggers/logging.interceptor';
import { formatGraphQLError } from './utils/transformers/formatError';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ request: req }),
      formatError: formatGraphQLError,
    }),
    UserModule,
    LoginModule,
    RoleModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {}
