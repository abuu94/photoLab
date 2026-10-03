import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);

  const location = useLocation();

  const menu = [
    ["Dashboard", "/admin", "▣"],
    ["School Information", "/admin/school-info", "▤"],
    ["Activities", "/admin/activities", "◆"],
    ["Features", "/admin/features", "★"],
    ["Facilities", "/admin/facilities", "▦"],
    ["Images", "/admin/images", "🖼"],
    ["Settings", "/admin/settings", "⚙"],
  ];

  const facilityItems = [
    ["Facilities", "/admin/facilities", "▦"],
    ["Contacts", "/admin/contacts", "☎"],
    ["Qualifications", "/admin/qualifications", "✓"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("shulebora_user");
    window.location.href = "/login";
  };

  const isFacilityActive = facilityItems.some(
    ([, path]) => location.pathname === path
  );

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

        {/* LOGO */}
        <div className="superadmin-logo">
          <div className="superadmin-logo-icon">
            <img
              src="/logo.png"
              alt="ShuleBora Logo"
            />
          </div>

          <div className="superadmin-logo-text">
            <strong>ShuleBora</strong>
            <span>School Admin</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="superadmin-nav">

          {menu.map(([label, path, icon]) => {

            {/* FACILITIES */}
            if (label === "Facilities") {
              return (
                <div
                  key={path}
                  className="sidebar-group"
                >

                  <button
                    type="button"
                    className={`superadmin-nav-link sidebar-parent ${
                      isFacilityActive ? "active" : ""
                    }`}
                    onClick={() =>
                      setFacilitiesOpen(!facilitiesOpen)
                    }
                  >
                    <span className="superadmin-nav-icon">
                      {icon}
                    </span>

                    <span className="sidebar-parent-label">
                      Facilities
                    </span>

                    <span
                      className={`sidebar-arrow ${
                        facilitiesOpen ? "open" : ""
                      }`}
                    >
                      ›
                    </span>
                  </button>

                  {/* SUB MENU */}
                  {facilitiesOpen && (
                    <div className="sidebar-submenu">

                      {facilityItems.map(
                        ([subLabel, subPath, subIcon]) => {

                          const active =
                            location.pathname === subPath;

                          return (
                            <Link
                              key={subPath}
                              to={subPath}
                              className={`sidebar-submenu-link ${
                                active ? "active" : ""
                              }`}
                              onClick={() =>
                                setSidebarOpen(false)
                              }
                            >
                              <span>{subIcon}</span>
                              <span>{subLabel}</span>
                            </Link>
                          );
                        }
                      )}

                    </div>
                  )}

                </div>
              );
            }

            {/* NORMAL MENU */}
            return (
              <Link
                key={path}
                to={path}
                className={`superadmin-nav-link ${
                  location.pathname === path
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSidebarOpen(false)
                }
              >
                <span className="superadmin-nav-icon">
                  {icon}
                </span>

                <span>{label}</span>
              </Link>
            );
          })}

        </nav>

        {/* LOGOUT */}
        <button
          className="superadmin-logout"
          onClick={handleLogout}
        >
          <span className="superadmin-nav-icon">
            ↪
          </span>

          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN */}
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
            <span>School Admin Panel</span>
          </div>

          <div className="superadmin-profile">

            <button
              className="superadmin-notification"
              aria-label="Notifications"
            >
              ●
            </button>

            <div className="superadmin-avatar">
              AD
            </div>

            <div className="superadmin-profile-info">
              <strong>School Admin</strong>
              <span>Administrator</span>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <section className="superadmin-content">
          {children}
        </section>

      </main>

    </div>
  );
};

export default AdminLayout;