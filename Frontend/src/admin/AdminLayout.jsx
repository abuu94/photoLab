import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menu = [
    ["Dashboard", "/admin", ""],
    ["School Information", "/admin/school-info", ""],
    ["Activities", "/admin/activities", ""],
    ["Features", "/admin/features", ""],
    ["Facilities", "/admin/facilities", ""],
    ["Images", "/admin/images", ""],
    ["Contacts", "/admin/contacts", ""],
    ["Qualifications", "/admin/qualifications", ""],
    ["Settings", "/admin/settings", ""],
  ];

  return (
    <div className="superadmin-layout">

      {sidebarOpen && (
        <div
          className="superadmin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`superadmin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="superadmin-logo">
          <div className="superadmin-logo-icon">S</div>

          <div>
            <strong>ShuleBora</strong>
            <span>School Admin</span>
          </div>
        </div>

        <nav className="superadmin-nav">
          {menu.map(([label, path, icon]) => (
            <Link
              key={path}
              to={path}
              className={`superadmin-nav-link ${
                location.pathname === path ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="superadmin-nav-icon">
                {icon}
              </span>

              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <button
          className="superadmin-logout"
          onClick={() => {
            localStorage.removeItem("shulebora_user");
            window.location.href = "/login";
          }}
        >
          <span></span>
          Logout
        </button>
      </aside>

      <main className="superadmin-main">

        <header className="superadmin-topbar">

          <button
            className="superadmin-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
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
            <button className="superadmin-notification">
              
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

        <section className="superadmin-content">
          {children}
        </section>

      </main>
    </div>
  );
};

export default AdminLayout;
