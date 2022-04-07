import { getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class User {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field((_type) => String)
  @prop({ type: () => String, required: true, unique: true })
  email!: string;

  @Field((_type) => String)
  @prop({ type: () => String, required: true, unique: true })
  username!: string;

  @Field((_type) => String)
  @prop({ type: () => String, required: true })
  password!: string;
}

export const UserModel = getModelForClass(User);

export default User;
