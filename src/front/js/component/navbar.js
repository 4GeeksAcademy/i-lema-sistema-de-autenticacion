import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

	const handleProfile= () => {
        navigate("/profile");
    };

	return (
		<nav className="navbar navbar-light bg-light">
					{!store.token ? (
						<div className="container-fluid">
							<div>
								<Link to="/">
									<img
										src={rigoImageUrl}
										className="img-fluid w-25 h-auto"
									/>
								</Link>
							</div>
							<div>
								<Link to="/login">
									<button className="btn btn-primary me-2">Log In</button>
								</Link>
								<Link to="/signup">
									<button className="btn btn-secondary">Sign Up</button>
								</Link>
							</div>							
						</div>
					) : (
						<div className="container-fluid">
							<div>
								<Link to="/">
									<img
										src={rigoImageUrl}
										className="img-fluid w-25 h-auto"
									/>
								</Link>
							</div>
							<div>
								<button onClick={() => actions.logout()} className="btn btn-primary">Log out</button>
							</div>
						</div>
					)}
		</nav>
	);
};
