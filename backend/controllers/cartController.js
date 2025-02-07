import userModel from "../models/userModel.js";

// add to cart user function
const addToCart = async(req, res) => {
    try {
        // let userData = await userModel.findById(req.body.userId); // this one as well as below line, both works
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message: "Added to cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// remove from cart user function
const removeFromCart = async(req, res) => {
    try {
        // let userData = await userModel.findById(req.body.userId);
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId]>0) { // in case of 0 item of the itemId, we dont execute
            cartData[req.body.itemId] -= 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, message: "Removed from cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}


// fetch user cart data
const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false ,message:"Error"})
    }
}


export {addToCart, removeFromCart, getCart};