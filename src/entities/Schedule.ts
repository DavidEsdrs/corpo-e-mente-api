import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn, Timestamp, getCustomRepository, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Transform } from "class-transformer";

@Entity("schedules")
class Schedule {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "applicant" })
    applicant: string;
    
    @Transform(({ value }) => new Date(value))
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