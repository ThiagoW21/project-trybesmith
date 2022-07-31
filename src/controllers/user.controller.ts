import { Request, Response } from 'express';
import Joi from 'joi';
import UserService from '../services/user.service';
import { sign } from '../services/jwt.service';
import User from '../interfaces/user.interface';

class UserController {
  constructor(private userService = new UserService()) { }

  public validateBodyCreate = (body: User) => {
    const schema = Joi.object({
      username: Joi.string().required().min(3),
      classe: Joi.string().required().min(3),
      level: Joi.number().required().greater(0)
        .message('"level" must be greater than or equal to 1'),
      password: Joi.string().required().min(8),
    }).validate(body);

    return schema;
  };

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;

    const { error } = this.validateBodyCreate(req.body);

    if (error) {
      if (['string.min', 'string.base', 'number.base', 'number.greater']
        .includes(error.details[0].type)) {
        return res.status(422).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }

    await this.userService
      .create({ username, classe, level, password });

    const token = sign(req.body);

    res.status(201).json({ token });
  };

  public validateBodyLogin = (body: { username: string, password: string }) => {
    const schema = Joi.object({
      username: Joi.string().not().empty().required(),
      password: Joi.string().not().empty().required(),
    }).validate(body);

    return schema;
  };

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const { error } = this.validateBodyLogin(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const user = await this.userService.login(username, password);

    if (!user[0]) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }    

    const token = sign(user);

    res.status(200).json({ token });
  };
}

export default UserController;
