export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              Banner Studio
              <span className="logo-dot" aria-hidden="true"></span>
            </div>
            <p>露天 UIUX Team × Sales</p>
          </div>
          <div className="footer-col">
            <h3>快速連結</h3>
            <ul>
              <li>
                Notion DB 後台
                <span className="footer-pill">需申請</span>
              </li>
              <li>
                Quick Start 教學
                <a
                  href="/quick-start.html"
                  className="footer-pill"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  線上
                </a>
                <a
                  href="/quick-start.pdf"
                  className="footer-pill"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>找 Kay</h3>
            <ul>
              <li>Google Chat: @kay</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 露天 UIUX Team · Internal Use Only
        </div>
      </div>
    </footer>
  );
}
