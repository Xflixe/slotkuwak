import React from "react";
import {BrowserRouter as Router, BrowserRouter, Redirect, Route, useParams} from "react-router-dom";
import {guestRoutes,userRoutes} from "../../route";
import StickFooter from "../mobile/stickFooter/index"
const account = React.lazy(() => import(("../../screens/account/accountScreen")));


const MainNavigator = ()=>{
    return (
        <>
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

        </>


    )

}
export default MainNavigator;
