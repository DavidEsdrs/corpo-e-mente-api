import { Router } from "express";
import { 
    ChangeScheduleController,
    DeleteAllController,
    GetSchedulesController,
    LoginController,
    NewAccountController,
    ScheduleController,
    ensureAdmin,
    ensureAuthenticatedUser,
    UpdateScheduleSituation,
    GetMySchedulesController,
    AdminChangeScheduleController,
    GetScheduleInfoController
} from "./index";

const routes = Router();
const updateSchedulesSituation = new UpdateScheduleSituation();

const newAccountController = new NewAccountController();
const loginController = new LoginController();
const scheduleController = new ScheduleController();
const deleteAllController = new DeleteAllController();
const changeScheduleController = new ChangeScheduleController();
const getSchedulesController = new GetSchedulesController();
const getMySchedulesController = new GetMySchedulesController();
const adminChangeScheduleController = new AdminChangeScheduleController();
const getScheduleInfoController = new GetScheduleInfoController();

routes.post('/user/new', newAccountController.handle);

routes.post('/login', loginController.handle);

routes.post('/user/schedules/new', ensureAuthenticatedUser, scheduleController.handle);

routes.delete('/user/schedules', /*ensureAuthenticatedUser, ensureAdmin,*/ deleteAllController.handle);

routes.get('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, getSchedulesController.handler);

routes.put('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, adminChangeScheduleController.handle);

routes.put('/user/schedules', ensureAuthenticatedUser, changeScheduleController.handle);

routes.get('/user/schedules', ensureAuthenticatedUser, getMySchedulesController.handle);

routes.get('/user/schedules/:id', ensureAuthenticatedUser, getScheduleInfoController.handle);

const oneDay = 86400000;

setInterval(updateSchedulesSituation.deleteCancelledAppointments, oneDay);
setInterval(updateSchedulesSituation.updateSchedulesSituation, oneDay * 2);
setInterval(updateSchedulesSituation.updateScheduleToConcluded, oneDay * 3);

export { routes }
