import React from "react";
import {BrowserRouter as Router, BrowserRouter, Redirect, Route, useParams} from "react-router-dom";
import {guestRoutes,userRoutes} from "../../route";
import {createBrowserHistory} from "history";
import StickFooter from "../mobile/stickFooter/index"
const account = React.lazy(() => import(("../../screens/account/accountScreen")));


const MainNavigator = ()=>{
    const browserHistory = createBrowserHistory();
    return (
        <Router history={browserHistory}>
            <BrowserRouter>
                {(userRoutes).map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                params={{page:route.page}}
                                render={props => (
                                    <>
                                        <route.component {...props} />
                                        <StickFooter/>
                                    </>
                                )} />
                        ) :   <Redirect to={'/en'}/>;
                })}
            </BrowserRouter>

        </Router>
    )

}
export default MainNavigator;
