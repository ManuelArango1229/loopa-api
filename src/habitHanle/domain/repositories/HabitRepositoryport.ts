import Habit from "../entities/Habit";
interface HabitRepositoryPort {
  getHabitById(id: string): Promise<Habit | null>;
  createHabit(habit: Habit): Promise<Habit>;
}

export default HabitRepositoryPort;
