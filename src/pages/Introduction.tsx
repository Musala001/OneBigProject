import { type CSSProperties } from "react";
import { Link } from "react-router-dom";

const Introduction = () => {
  // Container styles
  const containerStyle: CSSProperties = {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#111827",
  };

  const titleStyle: CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#1f2937",
  };

  const sectionTitleStyle: CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "2rem 0 1rem 0",
    color: "#111827",
  };

  const textStyle: CSSProperties = {
    textAlign: "justify",
    marginBottom: "1rem",
    lineHeight: "1.7",
    color: "#374151",
  };

  const buttonContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "1.5rem",
  };

  const buttonStyle: CSSProperties = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#1f2937",
    borderRadius: "6px",
    transition: "background-color 0.3s, transform 0.2s",
    cursor: "pointer",
  };

  // Cipher pages
  const pages = [
    { name: "Shift", path: "/shift-cipher" },
    { name: "Affine", path: "/affine-cipher" },
    { name: "Keyword Mixed", path: "/keyword-mixed" },
    { name: "Symmetric", path: "/symmetric-cipher" },
    { name: "Vigenère", path: "/vigenere-cipher" },
    { name: "Hill", path: "/hill-cipher" },
    { name: "OTP", path: "/one-time-pad" },
    { name: "RSA", path: "/rsa" },
    { name: "Key Exchange", path: "/key-exchange" },
    { name: "ElGamal", path: "/elgamal" },
  ];

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Introduction to Cryptography</h1>

      <p style={textStyle}>
        Cryptography has been a crucial part of human communication, especially in diplomatic and military affairs. Its roots go back over 4000 years to the Egyptian period. Until the 1960s, cryptography was primarily used to protect national secrets, but with the advent of computers, internet banking, and commerce, the private sector became the largest user of cryptosystems.
      </p>

      <p style={textStyle}>
        A major breakthrough came in 1976 when Diffie and Hellman introduced public key cryptography. In 1978, Rivest, Shamir, and Adleman developed the first practical public key system, RSA, based on the difficulty of factoring large integers. In 1985, ElGamal introduced cryptosystems based on discrete logarithms, and in 1987, Koblitz proposed cryptography using elliptic curves.
      </p>

      <h2 style={sectionTitleStyle}>Basic Terminology</h2>

      <p style={textStyle}>
        Cryptology is the discipline devoted to secrecy systems. Cryptography focuses on designing and implementing secrecy systems, while cryptanalysis aims to break them. A plaintext message is transformed into ciphertext using a cipher and a key. Encryption converts plaintext into ciphertext, and decryption converts it back to plaintext.
      </p>

      <p style={textStyle}>
        A cryptosystem consists of a set of plaintext messages, ciphertext messages, keys, and corresponding encryption/decryption functions. In conventional (symmetric) cryptography, one key is used for both encryption and decryption, such as the Data Encryption Standard (DES).
      </p>

      <h2 style={sectionTitleStyle}>Project Outline</h2>

      <p style={textStyle}>
        This project aims to teach cryptography interactively. Each cipher has its own page where users can input text, choose keys, and see encryption/decryption in action. We cover:
      </p>

      <ul style={{ textAlign: "left", marginLeft: "1rem", lineHeight: "1.7", color: "#374151" }}>
        <li>Shift Ciphers</li>
        <li>Affine Cipher</li>
        <li>Keyword Mixed Cipher</li>
        <li>Symmetric Ciphers</li>
        <li>Vigenère Cipher</li>
        <li>Hill Cipher</li>
        <li>One-Time Pad</li>
        <li>RSA</li>
        <li>Key Exchange</li>
        <li>ElGamal</li>
      </ul>

      <div style={buttonContainerStyle}>
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Introduction;
