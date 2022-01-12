import { Request, Response } from 'express';
import { CreateClientUseCase } from './CreateClientUseCase';

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { username, password } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    let client;
    try {
      client = await createClientUseCase.execute({ username, password });
    } catch (err: any) {
      return response.status(400).json({ success: false, error: err.message })
    }
    return response.status(201).json({ success: true, client });
  }
}