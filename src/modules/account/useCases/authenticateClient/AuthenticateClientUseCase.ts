import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../shared/infra/prisma/';

interface IRequest {
  username: string;
  password: string;
}
interface IResponse {
  username: string;
  token: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IRequest): Promise<IResponse> {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });
    if (!client) {
      throw new Error('Username or password invalid!')
    }
    const password_match = await compare(password, client.password);

    if (!password_match) {
      throw new Error('Username or password invalid!')
    }
    const token = sign({ username }, "0e39769635821ba906d92fd72425eff0", {
      subject: client.id,
      expiresIn: '1d',
    });
    return {
      username: client.username,
      token,
    }
  }
}