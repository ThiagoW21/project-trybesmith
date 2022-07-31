import connection from '../models/connection';
import OrderModel from '../models/order.models';
import Order from '../interfaces/order.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    return this.model.getAll();
  }

  public async create(userId: number): Promise<number> {
    return this.model.create(userId);
  }
}

export default OrderService;
