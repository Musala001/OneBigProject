import { useState, type CSSProperties } from "react";

// Helper: create the mixed alphabet from keyword
const createMixedAlphabet = (keyword: string): string => {
  keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
  let result = "";
  for (const char of keyword) {
    if (!result.includes(char)) result += char;
  }
  const fullAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const char of fullAlphabet) {
    if (!result.includes(char)) result += char;
  }
  return result;
};

// Encrypt plaintext using keyword mixed alphabet
const encrypt = (text: string, mixedAlphabet: string): string => {
  text = text.toUpperCase();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return mixedAlphabet[alphabet.indexOf(char)];
      }
      return char; // keep spaces/punctuation
    })
    .join("");
};

// Decrypt ciphertext using keyword mixed alphabet
const decrypt = (text: string, mixedAlphabet: string): string => {
  text = text.toUpperCase();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return alphabet[mixedAlphabet.indexOf(char)];
      }
      return char;
    })
    .join("");
};

const KeywordMixedCipher = () => {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("DEMOCRATIC");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    const mixedAlphabet = createMixedAlphabet(keyword);
    setResult(encrypt(text, mixedAlphabet));
  };

  const handleDecrypt = () => {
    const mixedAlphabet = createMixedAlphabet(keyword);
    setResult(decrypt(text, mixedAlphabet));
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
      <h1 style={titleStyle}>Keyword Mixed Cipher</h1>

      <p style={sectionStyle}>
        The Keyword Mixed Cipher is a type of substitution cipher where a single
        keyword is used to create a mixed alphabet. Repeated letters in the
        keyword are removed, and the remaining letters of the alphabet are
        appended. This mixed sequence is used to substitute plaintext letters
        for ciphertext letters.
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
        Example: Using the keyword <b>DEMOCRATIC</b>, encrypt the message
        <i> EAT MEAT</i>. The ciphertext should match the table sequence
        explained in class.
      </p>
    </div>
  );
};

export default KeywordMixedCipher;
