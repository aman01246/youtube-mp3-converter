
import Waveform from "./Waveform";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          SIMPLE VIDEO TO AUDIO CONVERTER
        </div>

        <h1>
          Your videos.
          <br />
          <br />
          Your <span>music.</span>
        </h1>

        <p className="hero-description">
          Turn YouTube videos into MP3 audio.
          <br />
          Just paste a link, convert, and download.
        </p>

        <Waveform />

        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">♫</span>
            <div>
              <strong>MP3 Audio</strong>
              <small>Audio conversion</small>
            </div>
          </div>

          <div className="feature-divider"></div>

          <div className="feature">
            <span className="feature-icon">↓</span>
            <div>
              <strong>Direct Download</strong>
              <small>Save your MP3</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <span className="bottom-line"></span>
        <span>Convert. Listen. Enjoy.</span>
      </div>
    </section>
  );
}

export default HeroSection;
