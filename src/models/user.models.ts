import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User) {
    const { username, classe, level, password } = user;
    await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Users 
      (username, classe, level, password) VALUES (?, ?, ?, ?)`,
      [username, classe, level, password],
    );
  }
  
  public async login(username: string, password: string): Promise<User[]> {
    const [rows] = await this.connection.query(
      'SELECT * FROM Trybesmith.Users WHERE username=? AND password=?',
      [username, password],
    );

    return rows as User[];
  }

  public async getUser(id: number): Promise<User[]> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'SELECT * FROM Trybesmith.Users WHERE id=?',
      [id],
    );

    const user = result as unknown as User;
    console.log(user.id);

    return result as unknown as User[];
  }
}
