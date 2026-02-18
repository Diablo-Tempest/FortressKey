import { connect } from "mongoose";
import 'dotenv/config';
const connectDB = async() => {
  try {
    await connect(process.env.MONGO_URI)
    console.log("MongoDB connection is established successfully!");
  } catch (error) {
    console.error("MongoDB connection failed!");
  }
}
export default connectDB
