import { useState, type CSSProperties } from "react";

// Helper functions
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const cleanText = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "");

// Convert letter to number 0-25
const letterToNum = (char: string) => alphabet.indexOf(char);

// Convert number 0-25 to letter
const numToLetter = (num: number) => alphabet[num % 26];

// Vigenere Encryption
const vigenereEncrypt = (text: string, keyword: string): string => {
  text = cleanText(text);
  keyword = cleanText(keyword);
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const pi = letterToNum(text[i]);
    const ki = letterToNum(keyword[i % keyword.length]);
    result += numToLetter(pi + ki);
  }
  return result;
};

// Vigenere Decryption
const vigenereDecrypt = (cipher: string, keyword: string): string => {
  cipher = cleanText(cipher);
  keyword = cleanText(keyword);
  let result = "";
  for (let i = 0; i < cipher.length; i++) {
    const ci = letterToNum(cipher[i]);
    const ki = letterToNum(keyword[i % keyword.length]);
    result += numToLetter((ci - ki + 26) % 26);
  }
  return result;
};

const VigenereCipher = () => {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("FOXES");
  const [result, setResult] = useState("");

  const handleEncrypt = () => setResult(vigenereEncrypt(text, keyword));
  const handleDecrypt = () => setResult(vigenereDecrypt(text, keyword));

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
      <h1 style={titleStyle}>Vigenère Cipher</h1>

      <p style={sectionStyle}>
        The Vigenère Cipher is a polyalphabetic substitution cipher. Each letter
        in the plaintext is shifted according to a repeating keyword. For
        example, with keyword <b>FOXES</b>, each letter of plaintext is
        encrypted using the corresponding letter of the keyword as a Caesar
        shift.
      </p>

      <h2>Try it yourself!</h2>

      <input
        style={inputStyle}
        type="text"
        placeholder="Enter plaintext or ciphertext"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        style={inputStyle}
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
        Example: Encrypt the message <i>ENEMY SIGNALS</i> with keyword{" "}
        <b>FOXES</b>. The ciphertext should match <b>JBBQQ XWDRS QG</b>.
      </p>
    </div>
  );
};

export default VigenereCipher;
