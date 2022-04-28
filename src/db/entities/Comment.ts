import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Field, ID, ObjectType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

import { User } from '.';

@ObjectType()
export class Comment extends TimeStamps {
  @Field((_type) => ID)
  _id!: string;

  @Field((_type) => User)
  @prop({ type: mongoose.Types.ObjectId, ref: () => User, required: true })
  user!: mongoose.Types.ObjectId;

  @Field()
  @prop({ type: String, required: true })
  postId!: string;

  @Field()
  @prop({ type: String, required: true })
  caption!: string;

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, default: [] })
  reactions!: string[];

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  updatedAt!: Date;
}
