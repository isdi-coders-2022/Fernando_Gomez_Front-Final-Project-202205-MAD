export const formatDate = (date: string): string => {
    date = date.slice(0, -9);
    date = (date).slice(1);
    date = (date).replace('T', ' ');
    return date;
}