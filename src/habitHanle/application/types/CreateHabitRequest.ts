import type Frequency from "../../domain/value_objects/Frequency";

type CreateHabitRequest = {
	name: string;
	description: string;
	frequency: Frequency;
	userId: string;
};
export default CreateHabitRequest;
