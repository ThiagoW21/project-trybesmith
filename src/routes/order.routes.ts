import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAll);

router.post('/orders', orderController.create);

export default router;
