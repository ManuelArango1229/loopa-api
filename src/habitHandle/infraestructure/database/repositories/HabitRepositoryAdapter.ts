import Habit from "../../../domain/entities/Habit";
import type HabitRepositoryPort from "../../../domain/repositories/HabitRepositoryport";
import type Frequency from "../../../domain/value_objects/Frequency";
import { prisma } from "../prisma/Prisma";

class HabitRepositoryAdapter implements HabitRepositoryPort {
  async getHabitsByDate(userId: string, date: Date): Promise<Habit[] | null> {
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
        createdAt: {
          lte: date,
        },
      },
    });
    const habitEntities = habits.map((habit) => {
      return new Habit(
        habit.name,
        habit.description,
        habit.frequency as Frequency,
        habit.userId,
        habit.id,
      );
    });
    return habitEntities;
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
