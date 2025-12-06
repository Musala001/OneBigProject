import { useState, type CSSProperties } from "react";

// Rail Fence Cipher with 2 rails
const railFenceEncrypt = (text: string): string => {
  text = text.replace(/[^A-Za-z]/g, "").toUpperCase();
  let rail1 = "";
  let rail2 = "";
  for (let i = 0; i < text.length; i++) {
    if (i % 2 === 0) rail1 += text[i];
    else rail2 += text[i];
  }
  return rail1 + rail2;
};

const railFenceDecrypt = (cipher: string): string => {
  cipher = cipher.replace(/[^A-Za-z]/g, "").toUpperCase();
  const mid = Math.ceil(cipher.length / 2);
  const rail1 = cipher.slice(0, mid);
  const rail2 = cipher.slice(mid);
  let result = "";
  for (let i = 0; i < mid; i++) {
    result += rail1[i] || "";
    result += rail2[i] || "";
  }
  return result;
};

const SymmetricCiphers = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    setResult(railFenceEncrypt(text));
  };

  const handleDecrypt = () => {
    setResult(railFenceDecrypt(text));
  };

  // Inline CSS
  const containerStyle: CSSProperties = {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
  };

  const titleStyle: CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const sectionStyle: CSSProperties = {
    textAlign: "justify",
    marginBottom: "1rem",
    lineHeight: "1.6",
  };

  const inputStyle: CSSProperties = {
    width: "80%",
    maxWidth: "400px",
    padding: "0.5rem",
    margin: "0.5rem 0",
    fontSize: "1rem",
  };

  const buttonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
    margin: "1rem 0",
  };

  const buttonStyle: CSSProperties = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#1f2937",
    color: "#fff",
    border: "none",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Symmetric Ciphers (Rail Fence)</h1>

      <p style={sectionStyle}>
        The Rail Fence Cipher is a transposition cipher. Plaintext is written
        in a zig-zag pattern across two rails. The ciphertext is then read row
        by row. For example, using 2 rails, the message "SEND MESSAGE" is
        written alternately on the top and bottom rails, then read row-wise.
      </p>

      <h2>Try it yourself!</h2>

      <input
        style={inputStyle}
        type="text"
        placeholder="Enter plaintext or ciphertext"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleEncrypt}>
          Encrypt
        </button>
        <button style={buttonStyle} onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Result: {result}</p>

      <p style={sectionStyle}>
        Example: Encrypt the message <i>I CAME I SAW I CONQUERED</i> using 2
        rails. The ciphertext should appear as per lecture notes.
      </p>
    </div>
  );
};

export default SymmetricCiphers;
