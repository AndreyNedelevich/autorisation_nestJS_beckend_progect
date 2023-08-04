import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import PostStore from "./store/PostStore";
import UserStore from "./store/UserStore";
import FilterUserStore from "./store/FilterUserStore";



export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        post: new PostStore(),
        filterUser: new FilterUserStore()
    }}>
    <App />
    </Context.Provider>,
);


