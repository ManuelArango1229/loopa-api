import type { Request } from "express";
import type CreateHabitRequest from "../../application/types/CreateHabitRequest";
import type CreateHabitResponse from "../../application/types/CreateHabitResponse";
import type GetAllHabitsByDateResponse from "../../application/types/GetAllHabitsByDateResponse";
import type CheckHabitInteractor from "../../application/use_cases/CheckHabitInteractor";
import type CreateHabitInteractor from "../../application/use_cases/CreateHabitInteractor";
import type GetAllHabitsByDateInteractor from "../../application/use_cases/GetAllHabitsByDateInteractor";
import type Habit from "../../domain/entities/Habit";
import InvalidRequestError from "../../domain/errors/InvalidRequestError";
import CreateHabitSchema from "../validation/CreateHabitSchema";
class HabitController {
	constructor(
		private createHabitInteractor: CreateHabitInteractor,
		private getAllHabitsByDateInteractor: GetAllHabitsByDateInteractor,
		private checkHabitInteractor: CheckHabitInteractor,
	) {}
	async createHabit(req: Request): Promise<CreateHabitResponse> {
		const parsed = CreateHabitSchema.safeParse(req.body);
		if (!parsed.success) {
			throw new InvalidRequestError(
				"Body Invalid for Create Habit",
				parsed.error.format(),
			);
		}
		const response: CreateHabitResponse =
			await this.createHabitInteractor.execute(
				parsed.data as CreateHabitRequest,
			);
		return response;
	}
	async getAllHabitsByDate(req: Request): Promise<GetAllHabitsByDateResponse> {
		const userId = req.userId;
		if (typeof req.query.date !== "string") {
			throw new InvalidRequestError("User ID must be a string");
		}
		const date = new Date(req.query.date);
		if (!userId || !date) {
			throw new InvalidRequestError("User ID and date are required");
		}
		const habits = await this.getAllHabitsByDateInteractor.execute(
			userId,
			date,
		);
		if (!habits) {
			throw new Error("No habits found for the given date");
		}
		const formattedHabits: GetAllHabitsByDateResponse = {
			habits: habits.map((habit: Habit) => ({
				id: habit.id,
				name: habit.name,
				description: habit.description,
				createdAt: habit.createdAt,
			})),
			date: date,
			userId: userId,
		};
		return formattedHabits;
	}

	async checkHabit(
		req: Request,
	): Promise<{ result: boolean; message: string }> {
		const { habitId, date } = req.body;
		if (typeof habitId !== "string" || typeof date !== "string") {
			throw new InvalidRequestError("Habit ID and date must be strings");
		}
		const response = await this.checkHabitInteractor.execute({
			habitId,
			date: new Date(date),
		});
		return response;
	}
}

export default HabitController;
