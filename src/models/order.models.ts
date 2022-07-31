import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const query = `SELECT ord.id, ord.userId, JSON_ARRAYAGG(prod.id) AS productsIds
    FROM Trybesmith.Orders AS ord
    INNER JOIN Trybesmith.Products AS prod ON prod.orderId = ord.id
    GROUP BY ord.id ORDER BY ord.userId`;

    const [orders] = await this.connection.execute(query);
   
    return orders as Order[];
  }

  public async create(userId: number): Promise<number> {
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Orders
      (userId) VALUES (?)`,
      [userId],
    );

    const { insertId } = dataInserted;

    return insertId;
  }
}
