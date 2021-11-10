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
    deleteCancelledAppointments,
    updateScheduleToConcluded,
    updateSchedulesSituation
} from "./index";

const routes = Router();

class Routes {
    postNewUser() {
        const newAccountController = new NewAccountController();

        routes.post('/user/new', newAccountController.handle);
    }

    postLogin() {
        const loginController = new LoginController();

        routes.post('/login', loginController.handle);
    }

    postNewSchedule() {
        const scheduleController = new ScheduleController();

        routes.post('/user/schedules/new', ensureAuthenticatedUser, scheduleController.handle);
    }

    deleteAllSchedulesAdmin() {
        const deleteAllController = new DeleteAllController();

        routes.delete('/user/schedules', ensureAuthenticatedUser, ensureAdmin, deleteAllController.handle);
    }

    getAllSchedules() {
        const getSchedulesController = new GetSchedulesController();

        routes.get('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, getSchedulesController.handler);
    }

    putChangeScheduleAdmin() {
        const adminChangeScheduleController = new AdminChangeScheduleController();

        routes.put('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, adminChangeScheduleController.handle);
    }

    putChangeSchedule() {
        const changeScheduleController = new ChangeScheduleController();

        routes.put('/user/schedules', ensureAuthenticatedUser, changeScheduleController.handle);
    }

    getSchedules() {
        const getMySchedulesController = new GetMySchedulesController();

        routes.get('/user/schedules', ensureAuthenticatedUser, getMySchedulesController.handle);
    }

    getScheduleInfo() { 
        const getScheduleInfoController = new GetScheduleInfoController();

        routes.get('/user/schedules/:id', ensureAuthenticatedUser, getScheduleInfoController.handle);
    }

    setObservers() {
        const oneDay = 86400000;

        setInterval(deleteCancelledAppointments, oneDay);
        setInterval(updateSchedulesSituation, oneDay * 2);
        setInterval(updateScheduleToConcluded, oneDay * 3);
    }

    constructor() {
        this.postNewUser();
        this.postLogin();
        this.postNewSchedule();
        this.deleteAllSchedulesAdmin();
        this.getAllSchedules();
        this.putChangeSchedule();
        this.putChangeScheduleAdmin();
        this.getSchedules();
        this.getScheduleInfo();
        this.setObservers();
    }
}

new Routes();

export { routes }