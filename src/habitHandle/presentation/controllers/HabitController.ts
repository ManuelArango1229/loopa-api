import type { Request } from "express";
import type CreateHabitRequest from "../../application/types/CreateHabitRequest";
import type CreateHabitResponse from "../../application/types/CreateHabitResponse";
import type CreateHabitInteractor from "../../application/use_cases/CreateHabitInteractor";
import InvalidRequestError from "../../domain/errors/InvalidRequestError";
import CreateHabitSchema from "../validation/CreateHabitSchema";
class HabitController {
	constructor(private createHabitInteractor: CreateHabitInteractor) {}
	async createHabit(req: Request): Promise<CreateHabitResponse> {
		const parsed = CreateHabitSchema.safeParse(req.body);
		if (!parsed.success) {
			throw new InvalidRequestError(parsed.error.format());
		}
		const response: CreateHabitResponse =
			await this.createHabitInteractor.execute(
				parsed.data as CreateHabitRequest,
			);
		return response;
	}
}

export default HabitController;
