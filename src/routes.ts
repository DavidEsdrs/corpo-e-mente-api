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

class Routes {
    /**
     * Route to create a new user
     */
    postNewUser() {
        const newAccountController = new NewAccountController();

        routes.post('/user/new', newAccountController.handle);
    }

    /**
     * Route to client login
     */
    postLogin() {
        const loginController = new LoginController();
        
        routes.post('/login', loginController.handle);
    }

    /**
     * Route to post a new appointment
     */
    postNewSchedule() {
        const scheduleController = new ScheduleController();

        routes.post('/user/schedules/new', ensureAuthenticatedUser, scheduleController.handle);
    }

    /**
     * Route available only for admins to delete all the appointments
     */
    deleteAllSchedulesAdmin() {
        const deleteAllController = new DeleteAllController();

        routes.delete('/user/schedules', ensureAuthenticatedUser, ensureAdmin, deleteAllController.handle);
    }

    /**
     * Route available only for admins for get the schedule
     */
    getAllSchedules() {
        const getSchedulesController = new GetSchedulesController();

        routes.get('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, getSchedulesController.handler);
    }

    /**
     * Route available only for admins for change any appointment situation
     */
    putChangeScheduleAdmin() {
        const adminChangeScheduleController = new AdminChangeScheduleController();

        routes.put('/admin/schedules', ensureAuthenticatedUser, ensureAdmin, adminChangeScheduleController.handle);
    }

    /**
     * Route to cancel an appointment
     */
    putChangeSchedule() {
        const changeScheduleController = new ChangeScheduleController();

        routes.put('/user/schedules/:id', ensureAuthenticatedUser, changeScheduleController.handle);
    }

    /**
     * Route to get all appointments of the user
     */
    getMySchedules() {
        const getMySchedulesController = new GetMySchedulesController();

        routes.get('/user/schedules', ensureAuthenticatedUser, getMySchedulesController.handle);
    }

    /**
     * Route to get a specific appointment
     */
    getScheduleInfo() { 
        const getScheduleInfoController = new GetScheduleInfoController();

        routes.get('/user/schedules/:id', ensureAuthenticatedUser, getScheduleInfoController.handle);
    }

    getSearchSchedule() {
        const searchScheduleController = new SearchScheduleController();

        routes.get('/admin/schedules/search', ensureAuthenticatedUser, searchScheduleController.handle);
    }

    setObservers() {
        const oneDay = 86400000;

        setInterval(deleteCancelledAppointments, oneDay);
        setInterval(updateSchedulesSituation, oneDay);
        setInterval(updateScheduleToConcluded, oneDay);
    }

    constructor() {
        this.postNewUser();
        this.postLogin();
        this.postNewSchedule();
        this.deleteAllSchedulesAdmin();
        this.getAllSchedules();
        this.putChangeSchedule();
        this.putChangeScheduleAdmin();
        this.getMySchedules();
        this.getScheduleInfo();
        this.setObservers();
        this.getSearchSchedule();
    }
}

new Routes();

export { routes }
