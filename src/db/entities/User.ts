import { prop } from '@typegoose/typegoose';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import mongoose from 'mongoose';

enum Account {
  DEFAULT = 'default',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@ObjectType()
export class User {
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

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, default: [] })
  followers!: string[];

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, default: [] })
  following!: string[];
}
