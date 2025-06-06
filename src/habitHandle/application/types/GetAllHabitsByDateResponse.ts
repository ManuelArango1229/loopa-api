type GetAllHabitsByDateResponse = {
  habits: {
    id: string | undefined;
    name: string;
    description: string;
    createdAt: Date;
  }[];
  date: Date;
  userId: string;
};

export default GetAllHabitsByDateResponse;
