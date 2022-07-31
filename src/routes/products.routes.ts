import { Router } from 'express';
import ProducController from '../controllers/product.controller';

const router = Router();

const producController = new ProducController();

router.get('/products', producController.getAll);

router.post('/products', producController.create);

export default router;
