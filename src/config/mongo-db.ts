import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Falta la variable de entorno MONGO_URI');
}

export class MongoDatabase {
  static async connect() {
    try {
      await mongoose.connect(MONGO_URI);

      console.log('MongoDB connected');
    } catch (error) {
      console.error('Mongo connection error:', error);
      throw error;
    }
  }
}