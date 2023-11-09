import mongoose from "mongoose";

const connect = { isConnected: 0 };
const connectDB = async () => {
  try {
    if (connect.isConnected) return;
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected!");
    connect.isConnected = connection.readyState;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
