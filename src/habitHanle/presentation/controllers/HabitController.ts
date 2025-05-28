import CreateHabitInteractor from "../../application/use_cases/CreateHabitInteractor";
import CreateHabitRequest from "../../application/types/CreateHabitRequest";
import CreateHabitResponse from "../../application/types/CreateHabitResponse";
import { Request } from "express";
class HabitController {
  constructor(private createHabitInteractor: CreateHabitInteractor) {}
  async createHabit(req: Request): Promise<CreateHabitResponse> {
    const habit: CreateHabitRequest = req.body;
    const response: CreateHabitResponse =
      await this.createHabitInteractor.execute(habit);
    return response;
  }
}

export default HabitController;
