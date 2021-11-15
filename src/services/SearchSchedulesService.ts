import { getCustomRepository } from "typeorm";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

interface ISchedule {
    id?: string;
    applicant?: string;
    scheduled_date?: string;
    situation?: string;
    requestApplicant?: string;
}

class SearchScheduleService {
    async execute({ id, applicant, scheduled_date, situation, requestApplicant }: ISchedule) {
        if(id) {
            return this.search({ id }, requestApplicant);
        }

        if(applicant && scheduled_date && situation) {
            return this.search({ applicant, scheduled_date, situation }, requestApplicant) ;
        }

        if(applicant && scheduled_date) {
            return this.search({ applicant, scheduled_date }, requestApplicant);
        }

        if(scheduled_date && situation) {
            return this.search({ situation, scheduled_date }, requestApplicant);
        }

        
        if(applicant) {
            return this.search({ applicant }, requestApplicant);
        }

        if(scheduled_date) {
            return this.search({ scheduled_date }, requestApplicant);
        }

        if(situation) {
            return this.search({ situation }, requestApplicant);
        }
        
        const allSchedules = await this.search({}, requestApplicant);

        return allSchedules;
    }

    async search(constraints: ISchedule, requestApplicant: string) {
        const schedulesRepository = getCustomRepository(SchedulesRepository);

        const schedules = await schedulesRepository.findWithApplicant({ 
            where: {
                ...constraints,
                applicant: {
                    id: requestApplicant
                }
            }
        });

        if(schedules) {
            return schedules;
        }

        return null;
    }
}

export { SearchScheduleService };