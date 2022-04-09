import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

class Token {
  _id!: mongoose.Types.ObjectId;

  @prop({ type: String, required: true, unique: true })
  userId!: string;

  @prop({ type: String, required: true, unique: true })
  token!: string;

  @prop({ type: Date, required: true, default: Date.now(), expires: 60 * 5 })
  createdAt!: Date;
}

export default getModelForClass(Token);
