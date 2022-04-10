import { prop } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

enum Account {
  DEFAULT = 'default',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@ObjectType()
class User {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field()
  @prop({ type: String, required: true })
  email!: string;

  @Field()
  @prop({ type: String, required: true, unique: true })
  username!: string;

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  password!: string;

  @Field()
  @prop({ type: String, required: true, enum: Account })
  account!: Account;

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  avatar!: string;
}

export default User;
