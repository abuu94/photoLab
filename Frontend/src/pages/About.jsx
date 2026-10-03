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
            ShuleBora is a platform created to connect communities
            with schools and make it easier to discover, understand
            and interact with educational institutions.
          </p>

        </div>

      </section>


      {/* WHO WE ARE */}
      <section className="about-section">

        <div className="about-grid">

          {/* VISUAL */}
          <div className="about-visual">

            {/* LARGE CARD REMOVED */}

            <div className="about-floating-card about-floating-one">
              <strong>500+</strong>
              <span>Schools</span>
            </div>

            <div className="about-floating-card about-floating-two">
              <strong>10K+</strong>
              <span>Community Members</span>
            </div>

          </div>


          {/* CONTENT */}
          <div className="about-content">

            <span className="about-label">
              WHO WE ARE
            </span>

            <h2>
              Making School Discovery
              <span> Simple & Better</span>
            </h2>

            <p>
              Finding the right school should be simple. ShuleBora
              brings useful school information together in one
              platform so parents, students and community members
              can make informed decisions.
            </p>

            <p>
              Through ShuleBora, users can explore schools, discover
              activities, learn about facilities and connect with
              schools in their communities.
            </p>

            <div className="about-values">

              <div>
                <span>✓</span>
                <strong>Accessible Information</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Community Connection</strong>
              </div>

              <div>
                <span>✓</span>
                <strong>Better Opportunities</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MISSION & VISION */}
      <section className="about-mission-section">

        <div className="about-section-heading">

          <span className="about-label">
            OUR PURPOSE
          </span>

          <h2>
            Building a Better
            <span> Education Community</span>
          </h2>

          <p>
            Our goal is to create a trusted digital space where
            schools and communities can connect and grow together.
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
              To make school information accessible and help
              communities discover educational opportunities
              through a simple and modern digital platform.
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
              To become a trusted platform connecting schools,
              students, parents and communities for a stronger
              educational future.
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
              We believe in accessibility, innovation, community,
              transparency and creating opportunities for the next
              generation.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <div>

          <span>
            Ready to explore?
          </span>

          <h2>
            Discover Schools with ShuleBora
          </h2>

          <p>
            Explore schools, activities and opportunities around
            your community.
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