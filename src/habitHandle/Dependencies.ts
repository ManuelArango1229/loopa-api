import CheckHabitInteractor from "./application/use_cases/CheckHabitInteractor";
import CreateHabitInteractor from "./application/use_cases/CreateHabitInteractor";
import GetAllHabitsByDateInteractor from "./application/use_cases/GetAllHabitsByDateInteractor";
import HabitCheckmarkRepositoryAdapter from "./infraestructure/database/repositories/HabitCheckmarkRepositoryAdapter";
import HabitRepositoryAdapter from "./infraestructure/database/repositories/HabitRepositoryAdapter";
import HabitController from "./presentation/controllers/HabitController";

const habitRepository = new HabitRepositoryAdapter();
const habitCheckmarkRepository = new HabitCheckmarkRepositoryAdapter();
const checkHabitInteractor = new CheckHabitInteractor(habitCheckmarkRepository);
const createHabitInteractor = new CreateHabitInteractor(habitRepository);
const getAllHabitsByDateInteractor = new GetAllHabitsByDateInteractor(
	habitRepository,
);

const habitController = new HabitController(
	createHabitInteractor,
	getAllHabitsByDateInteractor,
	checkHabitInteractor,
);
export { habitController };
