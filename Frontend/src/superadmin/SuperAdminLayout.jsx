import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SuperAdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/superadmin", icon: "" },
    { label: "Schools", path: "/superadmin/schools", icon: "" },
    { label: "Admins", path: "/superadmin/admins", icon: "" },
    { label: "Users", path: "/superadmin/users", icon: "" },
    { label: "Activities", path: "/superadmin/activities", icon: "" },
    { label: "Features", path: "/superadmin/features", icon: "" },
    { label: "Facilities", path: "/superadmin/facilities", icon: "" },
    { label: "Settings", path: "/superadmin/settings", icon: "" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("shulebora_user");
    window.location.href = "/login";
  };

  return (
    <div className="superadmin-layout">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="superadmin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`superadmin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="superadmin-logo">
          <div className="superadmin-logo-icon">S</div>

          <div>
            <strong>ShuleBora</strong>
            <span>SuperAdmin</span>
          </div>
        </div>

        <nav className="superadmin-nav">
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`superadmin-nav-link ${
                  active ? "active" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="superadmin-nav-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          className="superadmin-logout"
          onClick={handleLogout}
        >
          <span></span>
          Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <main className="superadmin-main">

        {/* TOPBAR */}
        <header className="superadmin-topbar">

          <button
            className="superadmin-hamburger"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="superadmin-topbar-title">
            <strong>ShuleBora</strong>
            <span>SuperAdmin Panel</span>
          </div>

          <div className="superadmin-profile">
            <button className="superadmin-notification">
              
            </button>

            <div className="superadmin-avatar">
              SA
            </div>

            <div className="superadmin-profile-info">
              <strong>SuperAdmin</strong>
              <span>Administrator</span>
            </div>
          </div>

        </header>

        {/* PAGE CONTENT */}
        <section className="superadmin-content">
          {children}
        </section>

      </main>
    </div>
  );
};

export default SuperAdminLayout;
