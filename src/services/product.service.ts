import connection from '../models/connection';
import ProductModel from '../models/products.models';
import Product from '../interfaces/product.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();

    return products;
  }

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }

  public async update(productId: number, orderId: number): Promise<void> {
    await this.model.update(productId, orderId);
  }
}

export default ProductService;
