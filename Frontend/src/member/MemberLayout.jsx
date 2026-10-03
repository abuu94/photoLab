import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MemberLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menu = [
    ["Dashboard", "/member", "▣"],
    ["Schools", "/member/schools", "▤"],
    ["Photos", "/member/photos", "🖼"],
    ["My Likes", "/member/likes", "♥"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("shulebora_user");
    window.location.href = "/login";
  };

  return (
    <div className="superadmin-layout member-layout">

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
            <span>Member</span>
          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="superadmin-nav">

          {menu.map(([label, path, icon]) => (

            <Link
              key={path}
              to={path}
              className={`superadmin-nav-link ${
                location.pathname === path
                  ? "active"
                  : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >

              <span className="superadmin-nav-icon">
                {icon}
              </span>

              <span>
                {label}
              </span>

            </Link>

          ))}

        </nav>

        {/* LOGOUT */}
        <button
          className="superadmin-logout"
          onClick={handleLogout}
        >

          <span className="superadmin-nav-icon">
            ↪
          </span>

          <span>
            Logout
          </span>

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

            <strong>
              ShuleBora
            </strong>

            <span>
              Member Portal
            </span>

          </div>

          <div className="superadmin-profile">

            <button
              className="superadmin-notification"
              aria-label="Notifications"
            >
              ●
            </button>

            <div className="superadmin-avatar">
              M
            </div>

            <div className="superadmin-profile-info">

              <strong>
                Member
              </strong>

              <span>
                Community User
              </span>

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

export default MemberLayout;