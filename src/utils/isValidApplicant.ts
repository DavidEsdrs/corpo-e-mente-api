export function isValidApplicant(scheduleApplicant: string, currentApplicant: string): boolean {
    if(scheduleApplicant === currentApplicant) {
        return true;
    }

    return false;
}