import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponse, UsersResponse } from './dto/user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResponse)
  async getme(
    @Context('req') req: { headers: { authorization: string } },
  ): Promise<UserResponse> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return {
        success: false,
        error: {
          message: 'Authorization header is required',
          statusCode: 400,
          error: 'Bad Request',
        },
      };
    }

    try {
      const user = await this.userService.getme(authHeader);
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.response?.data?.message || 'An unexpected error occurred',
          statusCode: error.response?.status || 500,
          error: error.response?.data?.error || 'Internal Server Error',
        },
      };
    }
  }

  @Query(() => UsersResponse)
  async getAllUsers(@Context('req') req: { headers: { authorization: string } }): Promise<UsersResponse> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return {
        success: false,
        error: {
          message: 'Authorization header is required',
          statusCode: 400,
          error: 'Bad Request',
        },
      };
    }

    try {
      const users = await this.userService.getAllUsers(authHeader);
      return { success: true, data: users };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.response?.data?.message || 'An unexpected error occurred',
          statusCode: error.response?.status || 500,
          error: error.response?.data?.error || 'Internal Server Error',
        },
      };
    }
  }

  @Query(() => UserResponse)
  async getUserById(
    @Args('id') id: string,
    @Context('req') req: { headers: { authorization: string } },
  ): Promise<UserResponse> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return {
        success: false,
        error: {
          message: 'Authorization header is required',
          statusCode: 400,
          error: 'Bad Request',
        },
      };
    }

    try {
      const user = await this.userService.getUserById(id, authHeader);
      return { success: true, data: user };
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
