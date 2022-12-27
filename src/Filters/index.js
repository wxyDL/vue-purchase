import dayjs from "dayjs";
export function numFilters (val) {
    if (val) {
        return val.toLocaleString()
    }
}

export function timeFormat (time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export function descsFormat (row) {
    console.log(row)
    return row.innerHTML
}
