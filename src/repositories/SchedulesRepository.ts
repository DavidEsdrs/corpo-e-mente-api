import { EntityRepository, FindManyOptions, Repository } from "typeorm";
import { Schedule } from "../entities/Schedule";

@EntityRepository(Schedule)
class SchedulesRepository extends Repository<Schedule> {
    async findWithApplicant(options?: FindManyOptions<Schedule>) {
        return this.find({
            ...options, 
            relations: [
                "applicant"
            ]
        })
    }
}

export { SchedulesRepository };