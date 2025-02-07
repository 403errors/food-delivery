import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// placing user order from the frontend

const placeOrder = async (req, res) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const frontend_url = 'http://localhost:5173';

    console.log("Received request in placeOrder:", req.body); // Log the request body

    try {
        const newOrder = new orderModel({
            // userId comming from the middleware
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save(); // save order in database

        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}}); // cleaning user cart data

        const line_items = req.body.items.map((item)=>({ // line items is neccessary for the stripe payment
            price_data: {
                currency:"inr",
                product_data: {
                    name: item.name
                },
                unit_amount: (item.price*100*80)
            },
            quantity: item.quantity
        }))

        line_items.push({  // adding delivery charge entry
            price_data:{
                currency:"inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount:2*100*80  // $2
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong!"})
    }
}

export { placeOrder }
