import { InputType, Field } from '@nestjs/graphql';

@InputType()
class PermissionInput {
  @Field()
  module: string;

  @Field(() => [String])
  actions: string[];
}

@InputType()
export class CreateRoleInput {
  @Field()
  name: string;

  @Field(() => [PermissionInput])
  permissions: PermissionInput[];
}
