import React, { useEffect, useState } from "react";
import "./Login.css"; // Assuming you have a CSS file for styles

function ThemeToggler() {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    return localStorage.getItem("theme") || "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Update localStorage
  };

  useEffect(() => {
    // Apply class to <body> or .login to trigger CSS variables
    document.body.classList.toggle("lightmode", theme === "light");
  }, [theme]);

  return (
    <div className="theme-toggler">
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
}

export default ThemeToggler;
