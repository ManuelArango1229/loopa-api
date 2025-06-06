import CreateHabitInteractor from "./application/use_cases/CreateHabitInteractor";
import GetAllHabitsByDateInteractor from "./application/use_cases/GetAllHabitsByDateInteractor";
import HabitRepositoryAdapter from "./infraestructure/database/repositories/HabitRepositoryAdapter";
import HabitController from "./presentation/controllers/HabitController";

const habitRepository = new HabitRepositoryAdapter();
const createHabitInteractor = new CreateHabitInteractor(habitRepository);
const getAllHabitsByDateInteractor = new GetAllHabitsByDateInteractor(
	habitRepository,
);

const habitController = new HabitController(
	createHabitInteractor,
	getAllHabitsByDateInteractor,
);
export { habitController };
