
const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-page-hero">
        <div className="about-page-hero-content">

          <span className="section-badge">
            About ShuleBora
          </span>

          <h1>
            Empowering the
            <span> Next Generation</span>
          </h1>

          <p>
            ShuleBora is a digital platform designed to connect
            communities with schools and make educational information
            easier to discover and access.
          </p>

        </div>
      </section>


      {/* ABOUT eGAZ */}
      <section className="about-section">

        <div className="about-grid">

          {/* VISUAL */}
          <div className="about-visual">
            <div className="about-egaz-box">
              <span>eGAZ</span>
              <strong>
                Education &amp; Community
              </strong>
            </div>
          </div>


          {/* CONTENT */}
          <div className="about-content">

            <span className="about-label">
              ABOUT eGAZ
            </span>

            <h2>
              Empowering Education Through
              <span> Digital Innovation</span>
            </h2>

            <p>
              eGAZ is the organization behind the development and
              implementation of ShuleBora, a digital platform created
              to improve access to school information and strengthen
              connections between schools and their communities.
            </p>

            <p>
              Through technology, eGAZ aims to support better access
              to educational information and create opportunities
              for schools, students, parents and communities to
              connect through a trusted digital platform.
            </p>

            <div className="about-values">

              <div>
                <span>✓</span>
                <strong>Education</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Digital Innovation</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Community Connection</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* SHULEBORA */}
      <section className="about-mission-section">

        <div className="about-section-heading">

          <span className="about-label">
            ABOUT SHULEBORA
          </span>

          <h2>
            Making School Discovery
            <span> Simple &amp; Accessible</span>
          </h2>

          <p>
            ShuleBora brings school information together in one
            digital platform so communities can discover and learn
            more about educational institutions.
          </p>

        </div>


        <div className="about-purpose-grid">

          {/* MISSION */}
          <div className="about-purpose-card">

            <div className="about-purpose-icon">
            </div>

            <h3>
              Our Mission
            </h3>

            <p>
              To make reliable school information easier to access
              and help communities discover educational opportunities
              through technology.
            </p>

          </div>


          {/* VISION */}
          <div className="about-purpose-card">

            <div className="about-purpose-icon">
            </div>

            <h3>
              Our Vision
            </h3>

            <p>
              To build a trusted digital platform that connects
              schools, students, parents and communities for a
              stronger educational future.
            </p>

          </div>


          {/* VALUES */}
          <div className="about-purpose-card">

            <div className="about-purpose-icon">
            </div>

            <h3>
              Our Values
            </h3>

            <p>
              Accessibility, innovation, transparency, community
              and creating better opportunities for the next
              generation.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <div>

          <span>
            Discover Education
          </span>

          <h2>
            Explore Schools with ShuleBora
          </h2>

          <p>
            Discover schools, activities and educational information
            available through the ShuleBora platform.
          </p>

          <a href="/schools">
            Explore Schools
            <span>→</span>
          </a>

        </div>

      </section>

    </div>
  );
};

export default About;