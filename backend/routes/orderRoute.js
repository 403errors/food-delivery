import expres from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = expres.Router();

orderRouter.post('/place', authMiddleware, placeOrder)

export default orderRouter;
