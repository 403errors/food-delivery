import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from "dotenv";

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config({ path: './.env' });

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "style-src": ["'self'", "https://*.stripe.com", "'unsafe-inline'"], // Allow Stripe styles
                "frame-src": ["'self'", "https://*.stripe.com", "https://*.stripecdn.com"], // Allow Stripe iframes
                "script-src": ["'self'", "https://*.stripe.com", "https://*.stripecdn.com"], //Allow Stripe scripts
                "img-src": ["'self'", "data:", "https://*.stripe.com", "https://*.stripecdn.com"], // Allow Stripe images
                "connect-src": ["'self'", "https://*.stripe.com", "https://*.stripecdn.com"], //Allow Stripe API connections
            },
        },
        crossOriginResourcePolicy: { policy: "cross-origin" }, // Add this line
    })
);

// db connection
connectDB();

// api endpoints
app.use("/images", express.static('uploads'));      // uploads folder will be exposed at the '/images' address
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API Working!');
});

app.listen(port, ()=> console.log(`Server is running on port ${port}`));
