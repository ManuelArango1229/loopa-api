import type HabitCheckmark from "../entities/HabitCheckmark";

interface HabitCheckmarkRepositoryPort {
	getCheckmarksByHabitIdWithDate(
		habitId: string,
		date: Date,
	): Promise<HabitCheckmark | null>;
	addCheckmark(checkmark: HabitCheckmark): Promise<HabitCheckmark>;
	deleteCheckmark(checkmarkId: string): Promise<void>;
	updateCheckmark(checkmark: HabitCheckmark): Promise<void>;
}

export default HabitCheckmarkRepositoryPort;
