import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const details = {
    bio: "",
    dob: "",
    gender: "",
    profilepic: "",
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = users.some((u) => u.email === email);
    e.preventDefault();

    if (username && email && password) {
      if (alreadyExists) {
        toast.error("User already exists!");
      } else if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      } else {
        const newUser = { username, email, password, details };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        toast.success("Signed up!");
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        navigate("/editprofile");
      }
    } else {
      toast.error("Please enter all fields");
    }
  };

  return (
    <div className="login">
      <div className="loginbox">
        <div className="signinlogo"></div>
        <div className="createacc"></div>
        <form className="signinform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button type="submit" className="signinbtn">
          </button>
        </form>
        <div className="loginfooter">
          <p className="signup-link">
            Already have an account?{" "}
            <Link
              to={"/login"}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
