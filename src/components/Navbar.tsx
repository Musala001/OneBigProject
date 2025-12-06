import { Link } from "react-router-dom";
import { CSSProperties } from "react";

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

  const linkStyle: CSSProperties = {
    color: "#fff",
    textDecoration: "none",
    padding: "0.3rem 0.5rem",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const linkHoverStyle: CSSProperties = {
    backgroundColor: "#374151",
  };

  return (
    <nav style={navStyle}>
      <div style={titleStyle}>Cryptography Explorer</div>
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/shift-cipher" style={linkStyle}>
          Shift
        </Link>
        <Link to="/affine-cipher" style={linkStyle}>
          Affine
        </Link>
        <Link to="/keyword-mixed" style={linkStyle}>
          Keyword Mixed
        </Link>
        <Link to="/symmetric-cipher" style={linkStyle}>
          Symmetric
        </Link>
        <Link to="/vigenere-cipher" style={linkStyle}>
          Vigenère
        </Link>
        <Link to="/hill-cipher" style={linkStyle}>
          Hill
        </Link>
        <Link to="/one-time-pad" style={linkStyle}>
          OTP
        </Link>
        <Link to="/rsa" style={linkStyle}>
          RSA
        </Link>
        <Link to="/key-exchange" style={linkStyle}>
          Key Exchange
        </Link>
        <Link to="/elgamal" style={linkStyle}>
          ElGamal
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
