import mongoose from 'mongoose';

import { MONGODB_URI } from '~/constants';

const connectToDb = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected ✔️');
    return;
  }

  if (!MONGODB_URI) throw new Error('MongoDB URI not found 🔨');

  mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) throw new Error('Server got an error 🔨');

    console.log('Connected to db 🚀');
  });
};

export default connectToDb;
