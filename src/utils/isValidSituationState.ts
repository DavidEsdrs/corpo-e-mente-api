export function isValidSituationState(situation: string): boolean {
    switch(situation) {
        case "scheduled":
        case "concluded":
        case "cancelled":
        case "awaiting":
            return true;
        default:
            return false;
    }
}