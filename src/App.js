import React, { useState, useEffect } from "react";
import ChartPanel from "./components/ChartPanel";
import "./index.css";

function App() {
  // Get initial theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  // Set theme attribute and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle window resize to auto-manage sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // localStorage is automatically updated in the useEffect above
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking on mobile menu items
  const handleMenuItemClick = (itemId) => {
    setActiveItem(itemId);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
      case "analytics":
        return (
          <div className="dashboard-content">
            {/* <StatsCards /> */}
            <ChartPanel />
          </div>
        );
      default:
        return (
          <div className="dashboard-content">
            <div className="panel">
              <div className="panel-header">
                <span>
                  {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
                </span>
              </div>
              <div className="panel-body">
                <p>This section is under construction. Coming soon!</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`app-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* Overlay for mobile */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
{/* 
      <Sidebar activeItem={activeItem} onItemClick={handleMenuItemClick} /> */}

      <div className="main-content">
        {/* <Navbar
          theme={theme}
          onThemeToggle={toggleTheme}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={handleSidebarToggle}
        /> */}

        <main className="content-area">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;
