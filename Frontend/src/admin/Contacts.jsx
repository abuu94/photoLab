import { useState } from "react";

const Contacts = () => {
  const [phone, setPhone] = useState("+255 000 000 000");
  const [email, setEmail] = useState("school@example.com");
  const [address, setAddress] = useState("Zanzibar, Tanzania");

  const save = (e) => {
    e.preventDefault();
    alert("Contact information saved successfully!");
  };

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">CONTACT</p>
          <h1>School Contacts</h1>
          <p>Manage how the community can contact your school.</p>
        </div>
      </div>

      <form className="superadmin-settings-card" onSubmit={save}>
        <div className="settings-group">
          <label>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="settings-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="settings-group">
          <label>Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button className="superadmin-primary-button">
          Save Contacts
        </button>
      </form>
    </div>
  );
};

export default Contacts;
