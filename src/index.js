import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, {Suspense} from 'react';
import ReactDOM from "react-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/styles/app.scss"
import {Provider} from "./core";
import {store as Store} from "./core/store/store";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../node_modules/swiper/swiper.scss';
import '../node_modules/swiper/modules/navigation/navigation.scss';
import '../node_modules/swiper/modules/pagination/pagination.scss';
import {createBrowserHistory} from "history"
import {BrowserRouter as Router, BrowserRouter, Redirect, Route, useParams} from "react-router-dom";

/*const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense  fallback={""}>
            <Provider store={Store}>
                <App />
            </Provider>
        </Suspense>
    </React.StrictMode>
);*/
const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <Suspense  fallback={""}>
          <Provider store={Store}>
              <Router history={browserHistory}>
                      <App />
              </Router>
          </Provider>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

