import React from "react";
import { useParams } from "react-router";

const withRouterHOC = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
    
    return (
        <WrappedComponent {...props} params={params} />
    );
};

export default withRouterHOC;