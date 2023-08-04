import React from 'react';
import {ToastContainer,Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.css';

import './Notification.css'

const Notification = () => {


    return (
        <ToastContainer
            position="top-center"
            transition={Slide}
            limit={1}
            autoClose={4500}
            hideProgressBar={false}
            draggable={true}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
        />
    );
}

export {Notification};
