class HabitCheckmark {
	private id?: string;
	private habitId: string;
	private date: Date;
	private completed: boolean;

	constructor(habitId: string, date: Date, completed: boolean, id?: string) {
		this.id = id;
		this.habitId = habitId;
		this.date = date;
		this.completed = completed;
	}

	getId(): string | undefined {
		return this.id;
	}
	getHabitId(): string {
		return this.habitId;
	}
	getDate(): Date {
		return this.date;
	}
	isCompleted(): boolean {
		return this.completed;
	}
	setCompleted(completed: boolean): void {
		this.completed = completed;
	}
	setDate(date: Date): void {
		this.date = date;
	}
	setHabitId(habitId: string): void {
		this.habitId = habitId;
	}

	toJSON(): object {
		return {
			id: this.id,
			habitId: this.habitId,
			date: this.date,
			completed: this.completed,
		};
	}
}

export default HabitCheckmark;
