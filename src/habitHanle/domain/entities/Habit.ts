import type Frequency from "../value_objects/Frequency";
class Habit {
	private _id?: string;
	private _name: string;
	private _description: string;
	private _frequency: Frequency;
	private _userId: string;
	private _createdAt: Date;

	constructor(
		name: string,
		description: string,
		frequency: Frequency,
		userId: string,
		id?: string,
		createAt?: Date,
	) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._frequency = frequency;
		this._userId = userId;
		this._createdAt = createAt ?? new Date();
	}

	get id(): string | undefined {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}

	get frequency(): Frequency {
		return this._frequency;
	}

	get userId(): string {
		return this._userId;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	set name(name: string) {
		this._name = name;
	}

	set description(description: string) {
		this._description = description;
	}

	set frequency(frequency: Frequency) {
		this._frequency = frequency;
	}

	set userId(userId: string) {
		this._userId = userId;
	}

	set createdAt(createdAt: Date) {
		this._createdAt = createdAt;
	}

	toString(): string {
		return `Habit: ${this._name}, Description: ${this._description}, Frequency: ${JSON.stringify(this._frequency)}, User ID: ${this._userId}, Created At: ${this._createdAt.toISOString()}`;
	}
}

export default Habit;
