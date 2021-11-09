import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn, Timestamp } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("schedules")
class Schedule {
    @PrimaryColumn()
    readonly id: string;

    @OneToOne(() => User, user => user.id)
    @Column()
    applicant: string;

    @Column({ type: "varchar" })
    scheduled_date: Timestamp;

    @Column()
    situation: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Schedule };