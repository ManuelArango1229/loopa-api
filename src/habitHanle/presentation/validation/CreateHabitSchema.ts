import { z } from "zod";

const FrequencySchema = z.discriminatedUnion("type", [
	z
		.object({
			type: z.literal("daily"),
		})
		.strict(),

	z
		.object({
			type: z.literal("weekly"),
			day: z.array(z.number().min(0).max(6)),
		})
		.strict(),

	z
		.object({
			type: z.literal("custom"),
			timesPerweek: z.number().min(1).max(7),
		})
		.strict(),
]);

const CreateHabitSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	description: z.string().optional(),
	frequency: FrequencySchema,
	userId: z.string().uuid({ message: "Invalid user ID format" }),
});

export default CreateHabitSchema;
