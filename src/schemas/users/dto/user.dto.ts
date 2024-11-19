import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorResponse } from '../../../utils/dto/error-response.dto';

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [String])
  roles: string[];
}

@ObjectType()
export class UserResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => User, { nullable: true })
  data?: User;

  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}

@ObjectType()
export class UsersResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [User], { nullable: true })
  data?: User[];

  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}
