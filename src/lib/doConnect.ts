import mongoose, { Connection } from 'mongoose';

const dbConnect = async (): Promise<void> => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    // Ensure MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Connection events
    const db: Connection = mongoose.connection;
    
    db.on('error', (error: Error) => {
      console.error("MongoDB connection error:", error);
    });

    db.once('open', () => {
      console.log("Connected to MongoDB");
    });

  } catch (error: unknown) {
    console.error("MongoDB connection error:", error instanceof Error ? error.message : error);
    process.exit(1); // Exit process with failure code
  }
};

export default dbConnect;