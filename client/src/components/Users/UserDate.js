import "./UserDate.css";


function UserDate({date}) {

    const dateObject = new Date(date);

    const month = dateObject.toLocaleString("ru-Ru", { month: "long" });
    const year = dateObject.getFullYear();
    const day = dateObject.toLocaleString("ru-Ru", { day: "2-digit" });


    return (
        <div className="user-date">
            <div className="user-date__day">{day}</div>
            <div className="user-date__month">{month}</div>
            <div className="user-date__year">{year}</div>

        </div>
    );
}

export {UserDate};
