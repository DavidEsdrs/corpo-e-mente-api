export function isValidDate(date: number): boolean {
    const saturday = 6;
    const dateAsDateType = new Date(date);
    const now = new Date();

    if(dateAsDateType < now) {
        return false;
    }

    if(dateAsDateType.getDay() !== saturday) {
        return false;
    }

    if(dateAsDateType.getHours() !== 8 && dateAsDateType.getHours() !== 11) {
        return false;
    }

    return true;
}