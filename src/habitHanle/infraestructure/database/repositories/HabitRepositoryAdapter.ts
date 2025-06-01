import Habit from "../../../domain/entities/Habit";
import type HabitRepositoryPort from "../../../domain/repositories/HabitRepositoryport";
import type Frequency from "../../../domain/value_objects/Frequency";
import { prisma } from "../prisma/Prisma";

class HabitRepositoryAdapter implements HabitRepositoryPort {
	getHabitById(id: string): Promise<Habit | null> {
		throw new Error("Method not implemented.");
	}
	async createHabit(habit: Habit): Promise<Habit> {
		const newHabit = await prisma.habit.create({
			data: {
				name: habit.name,
				description: habit.description,
				frequency: habit.frequency,
				userId: habit.userId,
			},
		});

		return new Habit(
			newHabit.name,
			newHabit.description,
			newHabit.frequency as Frequency,
			newHabit.userId,
			newHabit.id,
		);
	}
}

export default HabitRepositoryAdapter;
