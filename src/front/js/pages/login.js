import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FormLogin } from "../component/formLogin";

export const Login = props => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.token) {
            navigate("/");
        }
    }, [store.token]);

    return (
        <div>
            <FormLogin/>
        </div>
    );
};

Login.propTypes = {
    match: PropTypes.object
};
