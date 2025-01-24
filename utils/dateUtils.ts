export const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const resetHours = (date: Date) => {
    const result = new Date(date);
    result.setHours(0);
    return result;
}

export const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
}

export const compareMinutes = (date1: Date, date2: Date) => {
    if (date1.getMinutes() < date2.getMinutes()) {
        return (60 + date1.getMinutes()) - date2.getMinutes();
    }

    return date1.getMinutes() - date2.getMinutes();
}

export const compareHours = (date1: Date, date2: Date) => {
    if (date1.getHours() < date2.getHours()) {
        return (23 + date1.getHours()) - date2.getHours();
    }

    return date1.getHours() - date2.getHours();
}

export const compareDays = (date1: Date, date2: Date) => {
    if (date1.getDate() < date2.getDate()) {
        return ((getDaysInMonth(date2.getFullYear(), date2.getMonth()) - 1) + date1.getDate()) - date2.getDate();
    }

    return date1.getDate() - date2.getDate();
}

export const compareMonths = (date1: Date, date2: Date) => {
    if (date1.getMonth() < date2.getMonth()) {
        return (11 + date1.getMonth()) - date2.getMonth();
    }

    return date1.getMonth() - date2.getMonth();
}

export const compareDates = (date1: Date, date2: Date) => {
    let minutes = compareMinutes(date1, date2);
    let hours = compareHours(date1, date2);
    let days = compareDays(date1, date2) - 1;
    let months = compareMonths(date1, date2);

    if (days < 0) {
        days = getDaysInMonth(date2.getFullYear(), date2.getMonth()) - 1;
        months = months - 1
    }

    return {
        minutes: minutes,
        hours: hours,
        days: days,
        months: months,
    }
}