export function isValidDate(date: number): boolean {
    const saturday = 6;
    const dateAsDateType = new Date(date);

    if(dateAsDateType.getDay() === saturday && (dateAsDateType.getHours() === 8 || dateAsDateType.getHours() === 11)) {
        return true;
    }

    return false;
}