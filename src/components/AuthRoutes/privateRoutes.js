import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({
    user,
    children
}) => {

    // METHOD 1
    const navigate = useNavigate();
    const location = useLocation();
    useEffect( ()=> {
        if (!user) {
            navigate('/sign-in', {state: {from: location} });
        }
    })
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default PrivateRoute;
