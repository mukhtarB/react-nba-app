// import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({user}) => {

    const location = useLocation();
    console.log("p-routing", user)

    return (
        // <React.Fragment>
            user ? <Outlet /> : <Navigate to='/sign-in' replace state={{ from:location }} />
        // {/* </React.Fragment> */}
    );
};

export default PrivateRoute;