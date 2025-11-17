import mongoose from 'mongoose';

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/ai-guardian');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('App will run without database persistence.');
  }
};

export default connectDB;