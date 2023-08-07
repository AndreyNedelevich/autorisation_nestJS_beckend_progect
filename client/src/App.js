import React from "react";
import {BrowserRouter} from "react-router-dom";

import {AppRouter, NavBar, Notification} from "./components";
import './App.css';


function App() {

    return (
        <BrowserRouter>
            <Notification/>
            <NavBar/>
            <AppRouter/>
            <div className="data_admin">
                <div>administrator -admin@gmail.com</div>
                <div>password -admin2023</div>
            </div>
        </BrowserRouter>
    );
}

export default App;
