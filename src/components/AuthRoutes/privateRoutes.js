import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({
    user,
    children
}) => {

    const location = useLocation();

    // METHOD 1
    const navigate = useNavigate();
    
    useEffect( ()=> {
        if (!user) {
            navigate('/sign-in');
            // navigate('/sign-in', {state: {from: location} });
        }
    })

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
    

    // METHOD 2 - comes with redirect to prev page for UX boost

    // return (
    //     <React.Fragment>
    //         { user ? children : <Navigate to='/sign-in' replace state={{ from:location }} />}
    //     </React.Fragment>
    // )
}

export default PrivateRoute;