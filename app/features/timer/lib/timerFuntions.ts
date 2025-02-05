
export function createDisplayCount(timeSecond: number) {
    const minute = toTwoOrderNumber(Math.floor(timeSecond % 3600 / 60));
    const second = toTwoOrderNumber(timeSecond % 60);
    // return `${toTwoOrderNumber(minute)}:${toTwoOrderNumber(second)}`;
    return {minute, second}
}

export function countToMinute(count: number) {
    return Math.floor(count % 3600 / 60).toString();
}

export function countToSecond(count: number) {
    return (count % 60).toString();
}

function toTwoOrderNumber(num: number) {
    if (num < 10) {
        return (`00${num}`).slice(-2);
    }
    return num.toString();
}