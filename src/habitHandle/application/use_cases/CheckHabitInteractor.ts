import HabitCheckmark from "../../domain/entities/HabitCheckmark";
import type HabitCheckmarkRepositoryPort from "../../domain/repositories/HabitCheckmarkRepositoryPort";
import type CheckHabitRequest from "../types/CheckHabitRequest";
import type CheckHabitResponse from "../types/CheckHabitResponse";

class CheckHabitInteractor {
	private habitRepository: HabitCheckmarkRepositoryPort;

	constructor(habitRepository: HabitCheckmarkRepositoryPort) {
		this.habitRepository = habitRepository;
	}

	public async execute(
		request: CheckHabitRequest,
	): Promise<CheckHabitResponse> {
		const existingCheckmark =
			await this.habitRepository.getCheckmarksByHabitIdWithDate(
				request.habitId,
				request.date,
			);

		if (existingCheckmark) {
			throw new Error("Checkmark already exists for this habit on this date.");
		}

		const newCheckmark: HabitCheckmark = new HabitCheckmark(
			request.habitId,
			request.date,
			true,
		);

		const result = await this.habitRepository.addCheckmark(newCheckmark);
		if (!result) {
			throw new Error("Failed to add checkmark.");
		}
		return {
			result: true,
			message: "Checkmark added successfully.",
		};
	}
}

export default CheckHabitInteractor;
