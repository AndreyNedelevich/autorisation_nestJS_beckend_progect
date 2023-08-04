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
        </BrowserRouter>
    );
}

export default App;
