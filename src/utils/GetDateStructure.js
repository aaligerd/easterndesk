export const getCurrentDateString=(d)=>{
    const date=d?new Date(d):new Date();
    return `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`;
}

export const getCurrentDatetimeString=(d)=>{
    const date=d?new Date(d):new Date();
    return `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
