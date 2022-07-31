import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import ProductService from '../services/product.service';
import { auth } from '../services/jwt.service';

class OrderController {
  constructor(
    private oderService = new OrderService(), 
    private productService = new ProductService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.oderService.getAll();

    res.status(200).json(orders);
  };

  public validateBody = (productsIds: number[]) => {
    if (!productsIds) {
      return { message: '"productsIds" is required', code: 400 };
    }

    if (!Array.isArray(productsIds)) {
      return { message: '"productsIds" must be an array', code: 422 };
    }

    if (!productsIds[0]) {
      return { message: '"productsIds" must include only numbers', code: 422 };
    }
  };

  public create = async (req: Request, res: Response) => {
    const token: string | undefined = req.headers.authorization;
    const { productsIds } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    
    const userId = await auth(String(token));

    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const validateBody = this.validateBody(productsIds);
    
    if (validateBody) {
      return res.status(validateBody.code).json({ message: validateBody.message });
    }

    const orderId = await this.oderService.create(userId);

    await Promise.all(productsIds.map((id: number) => this.productService.update(id, orderId)));

    res.status(201).json({ userId, productsIds });
  };
}

export default OrderController;
