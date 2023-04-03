import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const FourOFour = ({}) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    },[])
    return (
        <>

        </>
    );
};

FourOFour.propTypes = {};
FourOFour.defaultProps = {};
