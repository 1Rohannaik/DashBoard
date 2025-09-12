import React, { useState, useEffect } from "react";
import AttendanceOverview from "./components/AttendanceOverview";
import "./index.css";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

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

  // const handleSidebarToggle = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  // const handleMenuItemClick = (itemId) => {
  //   setActiveItem(itemId);
  //   if (window.innerWidth <= 768) {
  //     setSidebarOpen(false);
  //   }
  // };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
      case "analytics":
        return (
          <div className="dashboard-content">
            <AttendanceOverview />
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

      {/* <Sidebar activeItem={activeItem} onItemClick={handleMenuItemClick} /> */}

      <div className="main-content">
        {/* <Navbar
          sidebarOpen={sidebarOpen}
          onSidebarToggle={handleSidebarToggle}
        /> */}

        <main className="content-area">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;
