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
            <h4>快速連結</h4>
            <ul>
              <li>
                Notion DB 後台
                <span className="footer-pill">需申請</span>
              </li>
              <li>Quick Start 教學</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>找 Kay</h4>
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
