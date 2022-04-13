import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '../shared';

@ObjectType()
export class ForgotPasswordResponse extends MutationResponse {
  @Field({ nullable: true })
  linkReset?: string;
}
