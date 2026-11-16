
import ConversionDetails from "./ConversionDetails";

function ConverterCard({
  url,
  setUrl,
  loading,
  error,
  success,
  setError,
  setSuccess,
  onPaste,
  onConvert
}) {
  return (
    <section className="converter-section">
      <div className="converter-card">
        <div className="card-header">
          <div>
            <span className="section-label">AUDIO CONVERTER</span>
            <h2>Convert to MP3</h2>
            <p>Paste your YouTube video URL below.</p>
          </div>

          <div className="music-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </div>

        <div className="input-section">
          <label htmlFor="youtube-url">YOUTUBE VIDEO URL</label>

          <div className="url-input">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
              <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21l1.7-1.7" />
            </svg>

            <input
              id="youtube-url"
              type="url"
              placeholder="Paste YouTube video link..."
              value={url}
              disabled={loading}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
                setSuccess("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  onConvert();
                }
              }}
            />

            <button
              className="paste-button"
              onClick={onPaste}
              disabled={loading}
              type="button"
            >
              Paste
            </button>
          </div>
        </div>

        <button
          className="convert-button"
          onClick={onConvert}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Converting...
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3v12m0 0 5-5m-5 5-5-5" />
                <path d="M5 17v3h14v-3" />
              </svg>
              Convert & Download MP3
              <span className="button-arrow">→</span>
            </>
          )}
        </button>

        {error && (
          <div className="feedback error">
            <span>!</span>
            {error}
          </div>
        )}

        {success && (
          <div className="feedback success">
            <span>✓</span>
            {success}
          </div>
        )}

        <div className="card-divider"></div>

        <ConversionDetails />
      </div>

      <p className="converter-note">
        Only convert videos you own or have permission to download.
      </p>
    </section>
  );
}

export default ConverterCard;
