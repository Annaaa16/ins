import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoose from 'mongoose';

import { User } from '.';

@ObjectType()
export class Post extends TimeStamps {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  caption!: string;

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: User, default: [] })
  reactions!: string[];

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  photo!: string;

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  photoId!: string;

  @Field((_type) => User)
  @prop({ type: mongoose.Types.ObjectId, ref: User, required: true })
  user!: mongoose.Types.ObjectId;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  updatedAt!: Date;
}