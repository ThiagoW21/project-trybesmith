import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Products 
      (name, amount) VALUES (?, ?)`,
      [name, amount],
    );

    const { insertId } = dataInserted;

    return { id: insertId, ...product };
  }

  public async getAll(): Promise<Product[]> {
    const [rows] = await this.connection.execute('SELECT * FROM Trybesmith.Products');

    return rows as Product[];
  }

  public async update(productId: number, orderId: number): Promise<void> {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId=? WHERE id=?', 
      [orderId, productId],
    );
  }
}
