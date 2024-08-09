import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const PrivateRoute = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) actions.getMessage();
    }, [store.token]);

	return (
		<div className="text-center mt-5">
            <div>
                <h1 className="display 1">
                    Esta es una página de acceso privado
                </h1>
            </div>
			<div className="alert alert-info">
				{store.message}
			</div>
		</div>
	);
};
