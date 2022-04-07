import { Field, ObjectType } from 'type-graphql';

// types
import BaseResponse from './BaseResponse';
import FieldError from './FieldError';

@ObjectType()
export default class MutationResponse extends BaseResponse {
  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
