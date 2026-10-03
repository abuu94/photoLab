import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./guest/components/Navbar";
import Hero from "./guest/components/Hero";
import SearchBar from "./guest/components/SearchBar";

import PublicLayout from "./guest/PublicLayout";
import Footer from "./guest/components/Footer";

import Schools from "./pages/Schools";
import Activities from "./pages/Activities";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";

/* SUPERADMIN */
import SuperAdminLayout from "./superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./superadmin/Dashboard";
import SuperAdminSchools from "./superadmin/Schools";
import SuperAdminAdmins from "./superadmin/Admins";
import SuperAdminUsers from "./superadmin/Users";
import SuperAdminActivities from "./superadmin/Activities";
import SuperAdminFeatures from "./superadmin/Features";
import SuperAdminFacilities from "./superadmin/Facilities";
import SuperAdminSettings from "./superadmin/Settings";

/* ADMIN */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Dashboard";
import AdminSchoolInfo from "./admin/SchoolInfo";
import AdminActivities from "./admin/Activities";
import AdminFeatures from "./admin/Features";
import AdminFacilities from "./admin/Facilities";
import AdminImages from "./admin/Images";
import AdminContacts from "./admin/Contacts";
import AdminQualifications from "./admin/Qualifications";
import AdminSettings from "./admin/Settings";

const Home = () => {
  return (
    <>
      <Hero />
      <SearchBar />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Route>


        {/* ================= SUPERADMIN ================= */}

        <Route
          path="/superadmin"
          element={
            <SuperAdminLayout>
              <SuperAdminDashboard />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/schools"
          element={
            <SuperAdminLayout>
              <SuperAdminSchools />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/admins"
          element={
            <SuperAdminLayout>
              <SuperAdminAdmins />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/users"
          element={
            <SuperAdminLayout>
              <SuperAdminUsers />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/activities"
          element={
            <SuperAdminLayout>
              <SuperAdminActivities />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/features"
          element={
            <SuperAdminLayout>
              <SuperAdminFeatures />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/facilities"
          element={
            <SuperAdminLayout>
              <SuperAdminFacilities />
            </SuperAdminLayout>
          }
        />

        <Route
          path="/superadmin/settings"
          element={
            <SuperAdminLayout>
              <SuperAdminSettings />
            </SuperAdminLayout>
          }
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/school-info"
          element={
            <AdminLayout>
              <AdminSchoolInfo />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/activities"
          element={
            <AdminLayout>
              <AdminActivities />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/features"
          element={
            <AdminLayout>
              <AdminFeatures />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/facilities"
          element={
            <AdminLayout>
              <AdminFacilities />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/images"
          element={
            <AdminLayout>
              <AdminImages />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/contacts"
          element={
            <AdminLayout>
              <AdminContacts />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/qualifications"
          element={
            <AdminLayout>
              <AdminQualifications />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;