import React from "react";
import { useParams, useNavigate, useLocation } from "react-router";

const withRouterHOC = WrappedComponent => props => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // etc... other react-router-dom v6 hooks
    
    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
            location={location}
        />
    );
};

export default withRouterHOC;

// -- To resolve
// SideNavItems -> resolved,
// Dashboard,
// signIn,
// NewsArticles -> resolved