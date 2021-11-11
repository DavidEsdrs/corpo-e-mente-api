import { EntityRepository, Repository } from "typeorm";
import { Schedule } from "../entities/Schedule";

@EntityRepository(Schedule)
class SchedulesRepository extends Repository<Schedule> {}

export { SchedulesRepository };