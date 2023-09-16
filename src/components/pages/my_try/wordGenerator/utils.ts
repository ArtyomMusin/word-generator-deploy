export const checkSingle = (value: number) => {
    return String(value).length < 2 ? `0${value}` : value
}

export const dateFormat = (dateFromDB: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(dateFromDB)
    return `${checkSingle(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`
}

export const getDifferentYearsFromNow = (date: string) => {
    const different = new Date().getFullYear() - new Date(date).getFullYear()
    return different <= 0 ? '<1' : different.toString()
}
