// // METHOD 0
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { firebase } from "../../firebase";

// const PrivateRoute = () => {
//     const user = firebase.auth().currentUser;

//     const location = useLocation();

//     return (
//         user ? <Outlet/> : <Navigate to='/sign-in' replace state={{ from:location }} />
//     );
// };

// export default PrivateRoute;


// METHOD 1a
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firebase } from "../../firebase";

const PrivateRoute = ({children}) => {

    const user = firebase.auth().currentUser;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( ()=> {
        if (!user) {
            navigate('/sign-in', {state: {from: location}, replace: true});
        }
    }, [user, location, navigate]);

    return {...children};
};

export default PrivateRoute;


// METHOD 1b
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { firebase } from "../../firebase";

// const PrivateRoute = ({children}) => {   

//     const location = useLocation();
//     const user = firebase.auth().currentUser;

//     return (
//         <React.Fragment>
//             { user ? children : <Navigate to='/sign-in' replace state={{ from:location }} />}
//         </React.Fragment>
//     );
// };

// export default PrivateRoute;