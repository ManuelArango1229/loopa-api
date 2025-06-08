import HabitCheckmark from "../../../domain/entities/HabitCheckmark";
import type HabitCheckmarkRepositoryPort from "../../../domain/repositories/HabitCheckmarkRepositoryPort";
import { prisma } from "../prisma/Prisma";

class HabitCheckmarkRepositoryAdapter implements HabitCheckmarkRepositoryPort {
	async getCheckmarksByHabitIdWithDate(
		habitId: string,
		date: Date,
	): Promise<HabitCheckmark | null> {
		const result = await prisma.habitCheckmark.findFirst({
			where: {
				habitId: habitId,
				date: date,
			},
		});

		if (!result) {
			return null;
		}
		return new HabitCheckmark(
			result.habitId,
			result.date,
			result.completed,
			result.id,
		);
	}
	async addCheckmark(checkmark: HabitCheckmark): Promise<HabitCheckmark> {
		const newCheckmark = await prisma.habitCheckmark.create({
			data: {
				habitId: checkmark.getHabitId(),
				date: checkmark.getDate(),
				completed: checkmark.isCompleted(),
			},
		});

		return new HabitCheckmark(
			newCheckmark.habitId,
			newCheckmark.date,
			newCheckmark.completed,
			newCheckmark.id,
		);
	}
	deleteCheckmark(checkmarkId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	updateCheckmark(checkmark: HabitCheckmark): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

export default HabitCheckmarkRepositoryAdapter;
