
import dateFormat from "dateformat";
import { LessThan } from "typeorm";

export function fixedLessThan(date: Date) {
    const formattedDate = new Date(dateFormat(date, "yyyy-mm-dd HH:MM:ss"));

    return LessThan(formattedDate);
}