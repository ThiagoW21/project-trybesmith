import connection from '../models/connection';
import UsertModel from '../models/user.models';
import User from '../interfaces/user.interface';

class UserService {
  public model: UsertModel;

  constructor() {
    this.model = new UsertModel(connection);
  }

  public async create(user: User) {
    return this.model.create(user);
  }

  public async login(username: string, password: string): Promise<User[]> {
    return this.model.login(username, password);
  }

  public async getuser(id: number): Promise<User[]> {
    return this.model.getUser(id);
  }
}

export default UserService;
