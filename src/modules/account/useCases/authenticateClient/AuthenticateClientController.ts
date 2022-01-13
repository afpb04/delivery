import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateClientUseCase = new AuthenticateClientUseCase();

    const auth = await authenticateClientUseCase.execute({ username, password });

    return response.json({ success: true, auth });

  }
}