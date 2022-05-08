import { Field, ObjectType } from 'type-graphql';

// types
import { PaginatedResponse } from '~/db/types/shared';

// entities
import { User } from '~/db/entities';

@ObjectType()
export class GetSuggestionsResponse extends PaginatedResponse {
  @Field((_type) => [User], { nullable: true })
  users?: User[];
}
