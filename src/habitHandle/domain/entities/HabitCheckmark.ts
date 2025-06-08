class HabitCheckmark {
  private id?: number;
  private habitId: number;
  private date: Date;
  private completed: boolean;
  private createdAt: Date;

  constructor(
    habitId: number,
    date: Date,
    completed: boolean,
    createdAt: Date,
    id?: number,
  ) {
    this.id = id;
    this.habitId = habitId;
    this.date = date;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  getId(): number | undefined {
    return this.id;
  }
  getHabitId(): number {
    return this.habitId;
  }
  getDate(): Date {
    return this.date;
  }
  isCompleted(): boolean {
    return this.completed;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  setCompleted(completed: boolean): void {
    this.completed = completed;
  }
  setDate(date: Date): void {
    this.date = date;
  }
  setHabitId(habitId: number): void {
    this.habitId = habitId;
  }
  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }
  toJSON(): object {
    return {
      id: this.id,
      habitId: this.habitId,
      date: this.date,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }
}
