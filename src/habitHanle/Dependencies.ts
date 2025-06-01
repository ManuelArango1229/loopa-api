import CreateHabitInteractor from "./application/use_cases/CreateHabitInteractor";
import HabitRepositoryAdapter from "./infraestructure/database/repositories/HabitRepositoryAdapter";
import HabitController from "./presentation/controllers/HabitController";

const habitRepository = new HabitRepositoryAdapter();
const createHabitInteractor = new CreateHabitInteractor(habitRepository);

const habitController = new HabitController(createHabitInteractor);
export { habitController };
