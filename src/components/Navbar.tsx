import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1f2937",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "0.5rem 1rem",
  };

  const topBarStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  const hamburgerStyle: CSSProperties = {
    fontSize: "1.5rem",
    cursor: "pointer",
    userSelect: "none",
  };

  const dropdownStyle: CSSProperties = {
    display: menuOpen ? "block" : "none",
    position: "absolute",
    right: "1rem",
    top: "3rem", // below the navbar
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "0.5rem 0",
    minWidth: "150px",
    zIndex: 1000,
  };

  const linkStyle: CSSProperties = {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "background-color 0.3s",
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/shift-cipher", label: "Shift" },
    { to: "/affine-cipher", label: "Affine" },
    { to: "/keyword-mixed", label: "Keyword Mixed" },
    { to: "/symmetric-cipher", label: "Symmetric" },
    { to: "/vigenere-cipher", label: "Vigenère" },
    { to: "/hill-cipher", label: "Hill" },
    { to: "/one-time-pad", label: "OTP" },
    { to: "/rsa", label: "RSA" },
    { to: "/key-exchange", label: "Key Exchange" },
    { to: "/elgamal", label: "ElGamal" },
  ];

  return (
    <nav style={navStyle}>
      <div style={topBarStyle}>
        <div style={titleStyle}>Cryptography Explorer</div>
        <div
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Dropdown menu */}
      <div style={dropdownStyle}>
        {links.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...linkStyle,
              backgroundColor: hoveredIndex === index ? "#374151" : "transparent",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
