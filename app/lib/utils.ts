// Date conversion
export function formateDate(date:string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    })
}

// Convert name into two letter
export function formateName(name:string){
    const words = name.split(" ");
    const firstLetters = words.slice(0, 2).map(word => word.charAt(0).toUpperCase());

    return firstLetters;
}