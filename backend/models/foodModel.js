import mongoose from "mongoose";

// create schema
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    }, 
    image : {
        type: String,
        required: true
    }, 
    category : {
        type: String,
        required: true
    }
});

// food is the model name, if exists, use the food model, otherwise create a new one
const foodModel = mongoose.models.food ||  mongoose.model("food", foodSchema);  

export default foodModel;