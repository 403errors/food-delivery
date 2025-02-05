import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pieisnot22by7:nmLRSYcw35rWVSYS@dbcluster.qwlar.mongodb.net/FoodDelivery').then(() => {console.log('Connected to MongoDB')});
}