import type Habit from "../entities/Habit";
interface HabitRepositoryPort {
	getHabitsByDate(userId: string, date: Date): Promise<Habit[] | null>;
	createHabit(habit: Habit): Promise<Habit>;
}

export default HabitRepositoryPort;
