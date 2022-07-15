export const dateToNumber = (date: string): string => {
    date = date.slice(0, -3);
    date = (date).slice(1);
    date = (date).replace('T', '');
    date = (date).replace('-', '');
    date = (date).replace('.', '');
    date = (date).replace(':', '');
    date = (date).replace(':', '');
    date = (date).replace('-', '');
    return date;
}