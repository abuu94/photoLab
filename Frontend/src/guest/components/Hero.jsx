import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Discover. Connect. Grow.
          </div>

          <h1>
            Discover the
            <span> Right School </span>
            for Your Future
          </h1>

          <p>
            ShuleBora helps you discover schools, explore their activities,
            learn about their facilities and connect with schools in your
            community.
          </p>

          <SearchBar />

          <div className="hero-actions">
            <a href="#schools" className="hero-primary-btn">
              Explore Schools
              <span>→</span>
            </a>

            <a href="#about" className="hero-secondary-btn">
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Schools</span>
            </div>

            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Community Members</span>
            </div>

            <div className="hero-stat">
              <strong>1000+</strong>
              <span>Activities</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <div className="hero-placeholder">
              <span className="hero-placeholder-icon"></span>
              <span>Explore Schools</span>
            </div>

            <div className="hero-floating-card hero-floating-top">
              <span className="floating-icon">✓</span>
              <div>
                <strong>Trusted Schools</strong>
                <small>Find schools near you</small>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-bottom">
              <span className="floating-icon">★</span>
              <div>
                <strong>School Activities</strong>
                <small>Discover what schools offer</small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;