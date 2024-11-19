import { ObjectType, Field } from '@nestjs/graphql';
import { ErrorResponse } from '../../../utils/dto/error-response.dto';


@ObjectType()
export class LoginData {
  @Field()
  id_token: string;

  @Field()
  message: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => LoginData, { nullable: true })
  data?: LoginData;

  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}
