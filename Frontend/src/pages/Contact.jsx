import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been received.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-page-hero">

        <div className="contact-page-hero-content">

          <span className="section-badge">
            Get In Touch
          </span>

          <h1>
            We'd Love to
            <span> Hear From You</span>
          </h1>

          <p>
            Have a question, suggestion or want to connect with
            ShuleBora? Send us a message and our team will get back
            to you.
          </p>

        </div>

      </section>


      {/* CONTACT CONTENT */}
      <section className="contact-page-content">

        <div className="contact-grid">

          {/* LEFT */}
          <div className="contact-info">

            <span className="contact-label">
              CONTACT US
            </span>

            <h2>
              Let's Start a
              <span> Conversation</span>
            </h2>

            <p>
              Whether you are a parent, student, school administrator
              or community member, we are here to help you connect
              with the right school information.
            </p>


            <div className="contact-info-list">

              <div className="contact-info-item">

                <div className="contact-info-icon">
                  
                </div>

                <div>
                  <h3>Our Location</h3>
                  <p>Zanzibar, Tanzania</p>
                </div>

              </div>


              <div className="contact-info-item">

                <div className="contact-info-icon">
                  
                </div>

                <div>
                  <h3>Email Us</h3>
                  <p>info@shulebora.com</p>
                </div>

              </div>


              <div className="contact-info-item">

                <div className="contact-info-icon">
                  
                </div>

                <div>
                  <h3>Call Us</h3>
                  <p>+255 700 000 000</p>
                </div>

              </div>


              <div className="contact-info-item">

                <div className="contact-info-icon">
                  
                </div>

                <div>
                  <h3>Working Hours</h3>
                  <p>Monday - Friday, 8:00 AM - 5:00 PM</p>
                </div>

              </div>

            </div>

          </div>


          {/* FORM */}
          <div className="contact-form-card">

            <div className="contact-form-header">
              <h2>Send Us a Message</h2>

              <p>
                Fill in the form below and we'll get back to you.
              </p>
            </div>


            <form onSubmit={handleSubmit}>

              <div className="contact-form-row">

                <div className="contact-form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="contact-form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>


              <div className="contact-form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                />

              </div>


              <div className="contact-form-group">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                />

              </div>


              <button
                type="submit"
                className="contact-submit-button"
              >
                Send Message
                <span>→</span>
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;
