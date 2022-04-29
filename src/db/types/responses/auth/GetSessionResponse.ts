import { Field, ObjectType } from 'type-graphql';

// types
import QueryResponse from '~/db/types/shared/QueryResponse';

// entities
import { User } from '~/db/entities';

@ObjectType()
export class GetSessionResponse extends QueryResponse {
  @Field((_type) => User, { nullable: true })
  user?: User | null;

  @Field((_type) => String, { nullable: true })
  accessToken?: string;
}
