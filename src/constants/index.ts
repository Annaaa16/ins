export * from './cloudinary';
export * from './token';
export * from './routes';
export * from './utils';
export * from './limits';

export const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@instagram-clone.ho9r4.mongodb.net/instagram-clone?retryWrites=true&w=majority`;

export const FACEBOOK_CLIENT_ID = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
