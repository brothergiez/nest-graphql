import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { RoleResponse } from './dto/role.dto';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => RoleResponse)
  async createRole(
    @Args('input') input: CreateRoleInput,
    @Context('req') req: { headers: { authorization: string } },
  ): Promise<RoleResponse> {
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
      const role = await this.roleService.createRole(input, authHeader);
      return {
        success: true,
        data: role,
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
