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
    GetMySchedulesController,
    AdminChangeScheduleController,
    GetScheduleInfoController,
    SearchScheduleController,
    deleteCancelledAppointments,
    updateScheduleToConcluded,
    updateSchedulesSituation
} from "./index";

const routes = Router();

/**
 * Route to create a new user
 */
const newAccountController = new NewAccountController();

routes.post('/user/new', newAccountController.handle);

/**
 * Route to client login
 */
const loginController = new LoginController();

routes.post('/login', loginController.handle);

/**
 * Route to post a new appointment
 */
const scheduleController = new ScheduleController();

routes.post('/user/schedules/new', ensureAuthenticatedUser, scheduleController.handle);

/**
 * Route available only for admins to delete all the appointments
 */
const deleteAllController = new DeleteAllController();

routes.delete('/user/schedules', ensureAuthenticatedUser, ensureAdmin, deleteAllController.handle);

/**
 * Route available only for admins for get the schedule
 */
const getSchedulesController = new GetSchedulesController();

routes.get('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, getSchedulesController.handler);

/**
 * Route available only for admins for change any appointment situation
 */
const adminChangeScheduleController = new AdminChangeScheduleController();

routes.put('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, adminChangeScheduleController.handle);

/**
 * Route to cancel an appointment
 */
const changeScheduleController = new ChangeScheduleController();

routes.put('/user/schedules/:id', ensureAuthenticatedUser, changeScheduleController.handle);

/**
 * Route to get all appointments of the user
 */
const getMySchedulesController = new GetMySchedulesController();

routes.get('/user/schedules', ensureAuthenticatedUser, getMySchedulesController.handle);

/**
 * Route to get a specific appointment
 */
const getScheduleInfoController = new GetScheduleInfoController();

routes.get('/user/schedules/:id', ensureAuthenticatedUser, getScheduleInfoController.handle);

const searchScheduleController = new SearchScheduleController();

routes.get('/admin/schedules/search', ensureAuthenticatedUser, searchScheduleController.handle);

const oneDay = 86400000;

setInterval(deleteCancelledAppointments, oneDay);
setInterval(updateSchedulesSituation, oneDay);
setInterval(updateScheduleToConcluded, oneDay);

export { routes }
