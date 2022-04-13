import { Field, ObjectType } from 'type-graphql';

// types
import { BaseResponse, FieldError } from '.';

@ObjectType()
export default class QueryResponse extends BaseResponse {
  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
