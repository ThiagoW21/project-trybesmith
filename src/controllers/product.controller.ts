import { Request, Response } from 'express';
import Joi from 'joi';
import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();

    res.status(200).json(products);
  };

  public validateBody = (name: string, amount: string) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
      amount: Joi.string().required().min(3),
    }).validate({ name, amount });

    return schema;
  };

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const { error } = this.validateBody(name, amount);

    if (error) {
      if (error.details[0].type === 'string.min' || error.details[0].type === 'string.base') {
        return res.status(422).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }

    const productCreated = await this.productService.create({ name, amount });

    res.status(201).json(productCreated);
  };
}

export default ProductController;
