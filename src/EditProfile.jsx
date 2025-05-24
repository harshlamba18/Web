import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Dashboard.css";
import "./EditProfile.css";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setUserDetails(storedUser.details);
      setUsername(storedUser.username);
    }
  }, [navigate]);

  const handleEdit = () => {
    if (
      !username.trim() ||
      !userDetails.bio.trim() ||
      !userDetails.gender ||
      !userDetails.dob
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    user.username = username;
    const updatedUser = {
      ...user,
      details: userDetails,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Details updated successfully");
    navigate("/dashboard");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be smaller than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          profilepic: base64Image,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkPassword = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const index = storedUsers.findIndex((u) => u.email === user.email);

      if (index === -1) {
        toast.error("User not found");
        return;
      }

      if (storedUsers[index].password !== currentPassword) {
        toast.error("Current password is incorrect");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
      if (newPassword.length < 6) {
        toast.error("New password must be at least 6 characters long");
        return;
      }

      // ✅ Update password
      setUser(storedUsers[index]);
      storedUsers[index].password = newPassword;
      localStorage.setItem("users", JSON.stringify(storedUsers));

      // ✅ Update loggedInUser with latest password
      const updatedLoggedInUser = {
        ...storedUsers[index],
      };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePassword(false);
    };

    return (
      <div className="changepassword">
        <h1>Change Password</h1>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="editbtn" type="button" onClick={checkPassword}>
          Update
        </button>
        <button
          className="editbtn"
          type="button"
          onClick={() => setShowChangePassword(false)}
        >
          Cancel
        </button>
      </div>
    );
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
          <div className={`profilephoto ${getGenderClass(userDetails.gender)}`}>
            {userDetails?.profilepic ? (
              <img
                src={userDetails.profilepic}
                alt="Preview"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="details">
          <button
            className="changepass"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
          <form className="bioform" onSubmit={(e) => e.preventDefault()}>
            <div className="editprofilepic">
              <h3>Profile Picture</h3>
              <h4>Upload </h4>
              <input
                className="selectprofilepic"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
              <h4>Remove</h4>
              <button
                type="button"
                className="rmvbtn"
                onClick={() =>
                  setUserDetails({ ...userDetails, profilepic: "" })
                }
              >
                Remove
              </button>
            </div>
            <div className="editotherdetails">
              {showChangePassword && <ChangePassword />}
              <h1>Edit Profile</h1>
              <h2>Full Name</h2>
              <input
                id="username"
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <h2>Bio</h2>
              <textarea
                id="bio"
                type="text"
                placeholder="Bio"
                value={userDetails.bio}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, bio: e.target.value })
                }
              />
              <h2>Gender</h2>
              <select
                id="gender"
                value={userDetails.gender}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <h2>Date of Birth</h2>
              <input
                id="dob"
                type="date"
                placeholder="Date of Birth"
                max={new Date().toISOString().split("T")[0]}
                value={userDetails.dob}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, dob: e.target.value })
                }
              />
              <button className="editbtn" id="s" type="button" onClick={handleEdit}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditProfile;
