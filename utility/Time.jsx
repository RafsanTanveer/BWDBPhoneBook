const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

export const timeStamp = () => {
    const months = ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const hours = ['', '', '', '', '', '', '', '', '', '', '', '',];
    const date = new Date()
    const amOrpm = date.getHours() >= 12 ? 'PM' : 'AM'
    const dateStr = `${months[(date.getMonth())]} ${padTo2Digits(date.getDate())}, ${date.getFullYear()}, ${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12 }:${padTo2Digits(date.getMinutes())} ${amOrpm}`;

    return dateStr;
}