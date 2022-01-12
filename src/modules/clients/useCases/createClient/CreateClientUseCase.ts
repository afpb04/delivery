import { prisma } from '../../../../shared/infra/prisma/';
import { hash } from 'bcryptjs';

interface IRequest {
  username: string;
  password: string;
}
interface IResponse {
  username: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: IRequest): Promise<IResponse> {

    const clientExist = await prisma.clients.findFirst({
      where: { username: { mode: 'insensitive' } }
    });

    if (clientExist) {
      throw new Error('Client already exists');
    }

    const password_hash = await hash(password, 8);

    await prisma.clients.create({
      data: {
        username,
        password: password_hash
      }
    });

    return { username };

  }
}