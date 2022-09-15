import "./login.css"
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);


    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };
    console.log(user);

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">BookWorm</h3>
                    <span className="loginDesc">Connect with friends and talk about your book. </span>

                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" className="loginInput" placeholder="Email" ref={email} required />
                        <input type="password" className="loginInput" placeholder="Password" ref={password} required minLength="5" />
                        <button className="loginButton">{isFetching ? <CircularProgress color="info" /> : "Login"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress color="info" /> : "Create New Account"}</button>
                    </form>
                </div>

            </div>

        </div>
    )
}
