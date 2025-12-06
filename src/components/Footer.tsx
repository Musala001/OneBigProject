import type { CSSProperties } from "react";

const Footer = () => {
  const footerStyle: CSSProperties = {
    width: "100%",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#1f2937",
    color: "#fff",
    marginTop: "2rem",
    position: "relative",
  };

  const linkStyle: CSSProperties = {
    color: "#9ca3af",
    textDecoration: "none",
    margin: "0 0.5rem",
  };

  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} Cryptography Explorer. All rights reserved.
      </p>
      <p>
        <a href="https://github.com/Musala001" style={linkStyle} target="_blank" rel="noreferrer">
          GitHub
        </a>
        |
        <a href="https://www.linkedin.com/in/musala-ndouvhada-78bb892b9/" style={linkStyle} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
