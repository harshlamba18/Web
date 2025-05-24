import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const details = {
    bio: "",
    dob: "",
    gender: "",
  };

  const handleSubmit = (e) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    e.preventDefault();
    if (email && password) {
      if (user) {
        toast.success("Logged in!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        if (user.details === details) {
          navigate("/editprofile");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      toast.error("Please enter all fields");
    }
  };
  return (
    <div className="login">
      <div className="loginbox">
        <div className="loginlogo"></div>
        <div className="welcome"></div>
        <form className="loginform" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="loginbtn">
          </button>
        </form>
        <div className="loginfooter">
          <p className="signup-link">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
