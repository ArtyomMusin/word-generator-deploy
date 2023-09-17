export const checkSingle = (value: number) => {
    return String(value).length < 2 ? `0${value}` : value
}

export const dateFormat = (dateFromDB: string, isShort: boolean = false) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(dateFromDB)
    return `${checkSingle(date.getDate())} ${isShort ? monthsShort[date.getMonth()] : months[date.getMonth()]} ${date.getFullYear()}`
}

export const getDifferentYearsFromNow = (date: string) => {
    const different = new Date().getFullYear() - new Date(date).getFullYear()
    return different <= 0 ? '<1' : different.toString()
}

export const getLetterPoint = (index: number) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p','q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    return letters[index]
}

export const requestAndConvertImg = async (url: string) => {
    const response = await fetch(url, {
        mode: "no-cors",
        method: "GET"
    })

    console.log(await response.blob())

    const buffer = await response.arrayBuffer()
    const base64Flag = 'data:image/jpeg;base64,'
    const imageStr = arrayBufferToBase64(buffer)

    // @ts-ignore
    function arrayBufferToBase64(buffer) {
        let binary = ''
        const bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return window.btoa(binary)
    }

    // console.log(base64Flag + imageStr)
    return url
}