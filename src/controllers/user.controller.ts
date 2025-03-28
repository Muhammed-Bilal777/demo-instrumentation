import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  };

  getUsers = async (request: Request, response: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      response.status(200).json({
        users: users,
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({
        message: "user not found",
      });
    }
  };
}

export default UserController;
