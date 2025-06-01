import type HabitRepositoryPort from "../../domain/repositories/HabitRepositoryport";
import Habit from "../../domain/entities/Habit";
import type CreateHabitResponse from "../types/CreateHabitResponse";
import type CreateHabitRequest from "../types/CreateHabitRequest";

class CreateHabitInteractor {
	private habitRepository: HabitRepositoryPort;

	constructor(habitRepository: HabitRepositoryPort) {
		this.habitRepository = habitRepository;
	}

	async execute(request: CreateHabitRequest): Promise<CreateHabitResponse> {
		if (
			!request.name ||
			!request.description ||
			!request.frequency ||
			!request.userId
		) {
			throw new Error("All fields are required");
		}

		const newHabit = new Habit(
			request.name,
			request.description,
			request.frequency,
			request.userId,
		);

		const createdHabit = await this.habitRepository.createHabit(newHabit);

		if (!createdHabit || !createdHabit.id) {
			throw new Error("Failed to create habit");
		}

		return {
			message: "Habit created successfully",
			habit: {
				id: createdHabit.id,
				name: createdHabit.name,
				description: createdHabit.description,
				frequency: createdHabit.frequency,
				userId: createdHabit.userId,
				createdAt: createdHabit.createdAt,
			},
		};
	}
}

export default CreateHabitInteractor;
