import type Habit from "../../domain/entities/Habit";
import type HabitRepositoryPort from "../../domain/repositories/HabitRepositoryport";
class GetAllHabitsByDateInteractor {
	private habitRepository: HabitRepositoryPort;

	constructor(habitRepository: HabitRepositoryPort) {
		this.habitRepository = habitRepository;
	}

	async execute(userId: string, date: Date): Promise<Habit[] | null> {
		const habits = await this.habitRepository.getHabitsByDate(userId, date);
		return habits;
	}
}

export default GetAllHabitsByDateInteractor;
