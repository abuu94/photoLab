import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./member.css";

export default function MemberLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("shulebora_user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("shulebora_token");
    localStorage.removeItem("shulebora_user");
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="member-layout">

      {sidebarOpen && (
        <div
          className="member-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`member-sidebar ${
          sidebarOpen ? "member-sidebar-open" : ""
        }`}
      >

        <div className="member-logo-area">
          <img
            src="/logo.png"
            alt="ShuleBora"
            className="member-logo"
          />

          <div className="member-brand-text">
            <h2>ShuleBora</h2>
            <span>Member Portal</span>
          </div>
        </div>

        <div className="member-menu-title">
          MAIN MENU
        </div>

        <nav className="member-nav">

          <NavLink
            to="/member"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "member-nav-link active"
                : "member-nav-link"
            }
          >
            <span className="member-nav-icon">⌂</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/member/schools"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "member-nav-link active"
                : "member-nav-link"
            }
          >
            <span className="member-nav-icon">▣</span>
            <span>Schools</span>
          </NavLink>

          <NavLink
            to="/member/photos"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? "member-nav-link active"
                : "member-nav-link"
            }
          >
            <span className="member-nav-icon">▧</span>
            <span>School Photos</span>
          </NavLink>

        </nav>

        <div className="member-sidebar-bottom">

          <div className="member-user-box">
            <div className="member-user-avatar">
              {(user.full_name || "M").charAt(0).toUpperCase()}
            </div>

            <div className="member-user-info">
              <strong>
                {user.full_name || "Member"}
              </strong>

              <span>
                {user.email || "Member Account"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="member-logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="member-main">

        <header className="member-topbar">

          <button
            type="button"
            className="member-menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="member-topbar-title">
            <strong>Member Portal</strong>
          </div>

          <div className="member-topbar-user">
            {user.full_name || "Member"}
          </div>

        </header>

        <section className="member-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}
