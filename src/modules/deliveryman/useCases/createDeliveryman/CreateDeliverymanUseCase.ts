import { hash } from "bcrypt";
import { prisma } from "../../../../shared/infra/prisma";

interface IRequest {
  username: string;
  password: string;
}
interface IResponse {
  username: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: IRequest): Promise<IResponse> {
    const clientExist = await prisma.deliveryman.findFirst({
      where: { username: { mode: 'insensitive' } }
    });

    if (clientExist) {
      throw new Error('Deliveryman already exists');
    }

    const password_hash = await hash(password, 8);

    await prisma.deliveryman.create({
      data: {
        username,
        password: password_hash,
      }
    });
    return { username };
  }
}