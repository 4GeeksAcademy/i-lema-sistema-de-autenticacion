import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const PasswordValidator = ({ password }) => {
    const validations = [
        {
            regex: /[a-z]/,
            message: 'At least 1 lowercase letter',
            valid: false,
        },
        {
            regex: /[A-Z]/,
            message: 'At least 1 uppercase letter',
            valid: false,
        },
        {
            regex: /\d/,
            message: 'At least 1 number',
            valid: false,
        },
        {
            regex: /[ºª+-=!@#$%^&*(),.?":{}|<>]/,
            message: 'At least 1 special character',
            valid: false,
        },
        {
            regex: /^.{8,42}$/,
            message: 'Must have 8-42 characters',
            valid: false,
        }
    ];

    validations.forEach(validation => {
        validation.valid = validation.regex.test(password);
    });

    return (
        <div className="password-validator">
            <h5>Password requirements:</h5>
            <ul>
                {validations.map((validation, index) => (
                    <li key={index} className={validation.valid ? 'text-success' : 'text-danger'}>
                        <i className={`fas ${validation.valid ? 'fa-check' : 'fa-times'}`}></i> {validation.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FieldValidator = ({ isValid, message }) => (
    <div className={isValid ? 'text-success' : 'text-danger'}>
        <i className={`fas ${isValid ? 'fa-check' : 'fa-times'}`}></i> {message}
    </div>
);

export const SignUp = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const validations = [
            /[a-z]/,
            /[A-Z]/,
            /\d/,
            /[ºª+-=!@#$%^&*(),.?":{}|<>]/,
            /^.{8,42}$/
        ];

        const allValid = validations.every((regex) => regex.test(newPassword));
        setPasswordValid(allValid);
        setPasswordsMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass);
        setPasswordsMatch(confirmPass === password);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
    };

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        setUsernameValid(newUsername.length > 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordValid && passwordsMatch && emailValid && usernameValid) {
            const success = await actions.register(email, username, password);
            if (success) {
                navigate("/login");
            }
        } else {
            alert("Please ensure all fields are correctly filled and passwords match.");
        }
    };

    return (
        <div className="text-center my-5 view">
            <form className="my-5 d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address (required)</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                    <FieldValidator isValid={emailValid} message="Valid email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username (required)</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                    <FieldValidator isValid={usernameValid} message="Username is required" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password (required)</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} placeholder="Must Have 8-42 Characters" />
                    <PasswordValidator password={password} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    <FieldValidator isValid={passwordsMatch} message="Passwords must match" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!passwordValid || !passwordsMatch || !emailValid || !usernameValid}>Register</button>
            </form>
        </div>
    );
};
