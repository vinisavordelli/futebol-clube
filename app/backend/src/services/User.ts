import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import IUser from '../interfaces/IUser';
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
        const { id, role, username } = foundUser;
        const token = jwt.sign({ id, role, username, email }, secret, jwtConfig);
        return { user: { id, username, role, email }, token };
      }
    }
    return null;
  }

  static async validate(authorization: string): Promise<IUser | null | any> {
    if (!authorization) return null;
    try {
      const verifiedToken = jwt
        .verify(authorization, fs.readFileSync('jwt.evaluation.key', 'utf8')) as IUser;
      console.log(verifiedToken);

      const user = await User.findOne({ where: { id: verifiedToken.id } });
      if (!user) return null;
      const { role } = user;
      return role;
    } catch (err) {
      console.log(err);
    }
  }
}
