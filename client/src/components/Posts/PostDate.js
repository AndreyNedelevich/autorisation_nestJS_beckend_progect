import "./PostDate.css";


function PostDate({date}) {

    const dateObject = new Date(date);

    const month = dateObject.toLocaleString("ru-Ru", { month: "long" });
    const year = dateObject.getFullYear();
    const day = dateObject.toLocaleString("ru-Ru", { day: "2-digit" });


    return (
        <div className="post-date">
            <div className="post-date__month">{month}</div>
            <div className="post-date__year">{year}</div>
            <div className="post-date__day">{day}</div>
        </div>
    );
}

export {PostDate};
