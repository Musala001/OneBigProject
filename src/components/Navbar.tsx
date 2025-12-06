import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useState } from "react";

const Navbar = () => {
  const navStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#1f2937",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
  };

  const linkContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  };

  const linkBaseStyle: CSSProperties = {
    color: "#fff",
    textDecoration: "none",
    padding: "0.3rem 0.5rem",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  // List of pages for easier scalability
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

  // Hover effect handled via inline state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav style={navStyle}>
      <div style={titleStyle}>Cryptography Explorer</div>
      <div style={linkContainerStyle}>
        {links.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...linkBaseStyle,
              backgroundColor: hoveredIndex === index ? "#374151" : "transparent",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
