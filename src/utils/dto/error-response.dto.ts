import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ErrorResponse {
  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  error: string;
}
