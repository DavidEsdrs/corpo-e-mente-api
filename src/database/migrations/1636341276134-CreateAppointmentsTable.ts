import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointmentsTable1636341276134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table(
            {
                name: "schedules",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "applicant",
                        type: "uuid"
                    },
                    {
                        name: "scheduled_date",
                        type: "timestamp"
                    },
                    {
                        name: "situation",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKSchedulesUsers",
                        referencedTableName: "users",
                        referencedColumnNames: [ "id" ],
                        columnNames: [ "applicant" ],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("schedules");
    }

}
