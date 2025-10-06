"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

export default function PersianDatePicker({ onDateChange }) {

    function persianToEnglishNumbers(str) {
        if (!str) return str;
        const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        return str.replace(/[۰-۹]/g, (w) => englishNumbers[persianNumbers.indexOf(w)]);
    }

    const handleChange = (date) => {
        if (!date) return;

        let gregorianDate = date.convert(gregorian).format("YYYY-MM-DD");
        gregorianDate = persianToEnglishNumbers(gregorianDate);

        onDateChange({
            date: gregorianDate,
        });
    };


    return (
        <DatePicker
            calendar={persian}
            locale={persian_fa}
            onChange={handleChange}
            calendarPosition="bottom-right"
            style={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                textAlign: "center",
            }}
        />
    );
}
