import React from "react";
import { useParams, useNavigate } from "react-router";

const withRouterHOC = WrappedComponent => props => {
    const params = useParams();
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks
    
    return (
        <WrappedComponent {...props} params={params} navigate={navigate} />
    );
};

export default withRouterHOC;