import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    try {
      const loginData = await this.loginService.login(input.email, input.password);
      return {
        success: true,
        data: loginData,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.response?.message || 'An unexpected error occurred',
          statusCode: error.response?.statusCode || 500,
          error: error.response?.error || 'Internal Server Error',
        },
      };
    }
  }
}
