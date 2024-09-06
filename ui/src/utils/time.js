const get_datetime_obj = () => {
    let now = new Data();
    return now;
};

const get_datetime = (now = new Date()) => {
    let year = now.getFullYear(); // 년도
    let month = now.getMonth() + 1; // 월
    let date = now.getDate(); // 날짜
    let day = now.getDay(); // 요일
    let hours = now.getHours(); // 시
    let minutes = now.getMinutes(); // 분
    let seconds = now.getSeconds(); // 초
    return {
        obj: now,
        str: `${year}. ${String(month).padStart(2, "0")}. ${String(
            date
        ).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(
            minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
        year: year,
        month: month,
        date: date,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
};

const get_date = (now = new Date()) => {
    let year = now.getFullYear(); // 년도
    let month = now.getMonth() + 1; // 월
    let date = now.getDate(); // 날짜
    let day = now.getDay(); // 요일
    return {
        obj: now,
        str: `${year}. ${month}. ${date}`,
        year: year,
        month: month,
        date: date,
        day: day,
    };
};

const get_time = (now = new Date()) => {
    let hours = now.getHours(); // 시
    let minutes = now.getMinutes(); // 분
    let seconds = now.getSeconds(); // 초
    return {
        obj: now,
        str: `${hours}:${minutes}:${seconds}`,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
};

const formattingDate = (dateObject) => {
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

const formattingTime = (dateObject) => {
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    const formattedTime = `${period} ${hours % 12}:${minutes}`;
    return formattedTime;
};

export {
    get_datetime_obj,
    get_datetime,
    get_date,
    get_time,
    formattingDate,
    formattingTime,
};
