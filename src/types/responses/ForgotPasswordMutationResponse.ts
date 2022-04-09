import { Field, ObjectType } from 'type-graphql';

// types
import MutationResponse from '../shared/MutationResponse';

@ObjectType()
export default class ForgotPasswordMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  linkReset?: string;
}
