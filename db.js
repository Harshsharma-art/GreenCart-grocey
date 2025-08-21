import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is undefined. Check your .env file.");
    }

    console.log("🔌 Connecting to MongoDB URI:", mongoURI);

    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ DB Connection Error:", err.message);
    });

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.log("❌ Error while connecting to DB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
