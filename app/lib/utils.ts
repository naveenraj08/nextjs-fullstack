// Date conversion
export function formateDate(date:string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    })
}