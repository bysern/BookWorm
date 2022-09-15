import "./register.css"
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                const res = await axios.post("/auth/register", user);
                navigate("/login");
            } catch (error) {
                console.log(error);
            }

        }



        // loginCall({ email: email.current.value, password: password.current.value }, dispatch);

    };


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">BookWorm</h3>
                    <span className="loginDesc">Connect with friends and talk about your book. </span>

                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="text" className="loginInput" required ref={username} placeholder="Username" />
                        <input type="email" className="loginInput" required ref={email} placeholder="Email" />
                        <input type="password" className="loginInput" required ref={password} placeholder="Password" minLength="6" />
                        <input type="password" className="loginInput" required ref={passwordAgain} placeholder="Password again" />
                        <button className="registerButton" type="submit">Sign Up</button>
                        <Link to="/login"><button className="loginRegisterButton">Login into your Account</button></Link>
                    </form>
                </div>

            </div>

        </div>
    )
}
