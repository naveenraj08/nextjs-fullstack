export function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}


// Date conversion
export function formateDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    })
}

// Convert name into two letter
export function formateName(name: string): string {
    if (!name) return "N/A";

    const words = name.split(" ");
    const firstLetters = words.slice(0, 2).map(word => word.charAt(0).toUpperCase());

    return firstLetters.join("");
}


export function parseServerActionResponse<T>(response: T) {
    return JSON.parse(JSON.stringify(response))
}