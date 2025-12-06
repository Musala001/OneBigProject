import { useState, type CSSProperties } from "react";

const ShiftCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(3); // default Caesar key
  const [result, setResult] = useState("");

  // Encrypt text using shift cipher
  const encrypt = () => {
    const encrypted = text
      .toUpperCase()
      .split("")
      .map((char) =>
        char >= "A" && char <= "Z"
          ? String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65)
          : char
      )
      .join("");
    setResult(encrypted);
  };

  // Decrypt text using shift cipher
  const decrypt = () => {
    const decrypted = text
      .toUpperCase()
      .split("")
      .map((char) =>
        char >= "A" && char <= "Z"
          ? String.fromCharCode(((char.charCodeAt(0) - 65 - key + 26) % 26) + 65)
          : char
      )
      .join("");
    setResult(decrypted);
  };

  // Inline CSS
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

  const sectionStyle: CSSProperties = {
    textAlign: "justify",
    marginBottom: "1rem",
    lineHeight: "1.7",
    color: "#374151",
  };

  const inputStyle: CSSProperties = {
    width: "80%",
    maxWidth: "400px",
    padding: "0.5rem",
    margin: "0.5rem 0",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
    margin: "1.5rem 0",
  };

  const buttonStyle: CSSProperties = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "6px",
    backgroundColor: "#1f2937",
    color: "#fff",
    border: "none",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const resultStyle: CSSProperties = {
    ...sectionStyle,
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Shift Cipher (Caesar Cipher)</h1>

      <p style={sectionStyle}>
        Shift ciphers are the earliest form of secret messages. Julius Caesar
        used a shift transformation to encrypt his military communications. In
        a shift cipher, each letter is replaced by another letter a fixed number
        of positions down the alphabet.
      </p>

      <p style={sectionStyle}>
        For example, using a key of <b>k = 3</b>, the plaintext letter A becomes
        D, B becomes E, ..., and Z becomes C. Encryption is done using the
        formula: <i>c = (p + k) mod 26</i>. Decryption uses: <i>p = (c - k) mod 26</i>.
      </p>

      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Try it yourself!</h2>

      <input
        style={inputStyle}
        type="text"
        placeholder="Enter text (letters only)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        style={inputStyle}
        type="number"
        placeholder="Enter key (integer)"
        value={key}
        onChange={(e) => setKey(Number(e.target.value))}
      />

      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={encrypt}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#374151")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#1f2937")
          }
        >
          Encrypt
        </button>
        <button
          style={buttonStyle}
          onClick={decrypt}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#374151")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#1f2937")
          }
        >
          Decrypt
        </button>
      </div>

      <p style={resultStyle}>Result: {result}</p>

      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Example Exercise</h2>
      <p style={sectionStyle}>
        Using the Caesar cipher with <b>key = 4</b>, encrypt the message
        <i> ATTACK AT DAWN</i>. Try entering it above and see the result.
      </p>
    </div>
  );
};

export default ShiftCipher;
