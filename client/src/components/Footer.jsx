import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p>© 2024 Gymnius TM. All rights reserved.</p>
            <div className="footer-links">
              <a href="/terms-of-service" className="footer-link">
                Terms of Service
              </a>
              <span>|</span>
              <a href="/privacy-policy" className="footer-link">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
