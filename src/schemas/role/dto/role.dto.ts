import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorResponse } from '../../../utils/dto/error-response.dto';


@ObjectType()
export class Role {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field(() => [Permission])
  permissions: Permission[];
}

@ObjectType()
export class Permission {
  @Field()
  module: string;

  @Field(() => [String])
  actions: string[];
}

@ObjectType()
export class RoleResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Role, { nullable: true })
  data?: Role;

  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}
