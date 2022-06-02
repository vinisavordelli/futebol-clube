import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import IToken from '../interfaces/IToken';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';

export default class UserService {
  static async Login({ email, password }: ILogin): Promise<IToken | null> {
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      const encryptedPassword = foundUser.password;
      const validatePassword = await bcrypt.compare(password, encryptedPassword);
      if (validatePassword) {
        const jwtConfig: jwt.SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
        const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
        const token = jwt.sign({ data: foundUser }, secret, jwtConfig);
        const { id, username, role } = foundUser;
        return { user: { id, username, role, email }, token };
      }
    }
    return null;
  }
}
