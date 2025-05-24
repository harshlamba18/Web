import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Dashboard.css";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const getGenderClass = (gender) => {
    switch (gender) {
      case "Male":
        return "male";
      case "Female":
        return "female";
      default:
        return "";
    }
  };

  return user ? (
    <div className="login">
      <div className="dbBox">
        <div className="cover-container">
          <div className="cover"></div>
          <div
            className={`profilephoto ${getGenderClass(user.details.gender)}`}
          >
            {user.details.profilepic ? (
              <img
                src={user.details.profilepic}
                alt="Profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="details">
          <div className="bio">
            <h1>Bio</h1>
            <h3>{user.details.bio}</h3>
          </div>
          <div className="leavebio">
            <div className="name">
              <h1>Welcome {user.username}</h1>
            </div>
            <div className="name">
              <h2>Email={user.email}</h2>
            </div>
            <div className="name">
              <h2>DOB={user.details.dob}</h2>
            </div>
            <div className="name">
              <h2>Gender={user.details.gender} </h2>
            </div>

            <div className="logedit">
              <button onClick={handleLogout} className="rmvbtn">
                Logout
              </button>
              <button
                className="editbtn"
                onClick={() => navigate("/editprofile")}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
