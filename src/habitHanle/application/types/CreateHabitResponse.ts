import Frequency from "../../domain/value_objects/Frequency";

type CreateHabitResponse = {
  message: string;
  habit: {
    id: string;
    name: string;
    description: string;
    frequency: Frequency;
    userId: string;
    createdAt: Date;
  };
};
export default CreateHabitResponse;
