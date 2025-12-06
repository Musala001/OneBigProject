import { useState, type CSSProperties } from "react";

// Convert uppercase letters A-Z to 5-bit binary string
const letterToBinary = (char: string) => {
  const num = char.charCodeAt(0) - 65;
  let bin = num.toString(2);
  return bin.padStart(5, "0");
};

// Convert 5-bit binary string to letter
const binaryToLetter = (bin: string) => {
  const num = parseInt(bin, 2);
  return String.fromCharCode(num + 65);
};

// Convert string to binary (5-bit per letter)
const textToBinary = (text: string) => {
  return text.toUpperCase().replace(/[^A-Z]/g, "").split("").map(letterToBinary).join("");
};

// Convert binary string to letters (5-bit blocks)
const binaryToText = (binStr: string) => {
  let result = "";
  for (let i = 0; i < binStr.length; i += 5) {
    const block = binStr.slice(i, i + 5);
    if (block.length === 5) result += binaryToLetter(block);
  }
  return result;
};

// XOR two binary strings of same length
const xorBinary = (bin1: string, bin2: string) => {
  let result = "";
  for (let i = 0; i < bin1.length; i++) {
    result += bin1[i] === bin2[i] ? "0" : "1";
  }
  return result;
};

const OneTimePad = () => {
  const [text, setText] = useState("");
  const [keystream, setKeystream] = useState("");
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    const plainBinary = textToBinary(text);
    if (keystream.length !== plainBinary.length) {
      setResult("Error: Keystream length must match plaintext binary length.");
      return;
    }
    const cipherBinary = xorBinary(plainBinary, keystream);
    setResult(cipherBinary);
  };

  const handleDecrypt = () => {
    const cipherBinary = text.replace(/[^01]/g, "");
    if (keystream.length !== cipherBinary.length) {
      setResult("Error: Keystream length must match ciphertext length.");
      return;
    }
    const plainBinary = xorBinary(cipherBinary, keystream);
    setResult(binaryToText(plainBinary));
  };

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
    gap: "0.5rem",
    margin: "1rem 0",
    flexWrap: "wrap",
  };

  const buttonStyle: CSSProperties = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#1f2937",
    color: "#fff",
    border: "none",
  };

  const sectionStyle: CSSProperties = { textAlign: "justify", marginBottom: "1rem", lineHeight: "1.6" };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>One-Time Pad (Stream Cipher)</h1>

      <p style={sectionStyle}>
        The One-Time Pad is a perfectly secure stream cipher. Each letter is converted to a 5-bit binary
        representation (A=00000, B=00001, …, Z=11001). The keystream must be random and of the same length
        as the plaintext in binary.
      </p>

      <h2>Enter plaintext / ciphertext</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Enter letters for encryption or binary for decryption"
        value={text}
        onChange={(e) => setText(e.target.value.toUpperCase())}
      />

      <h2>Enter keystream (binary string)</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Enter keystream of same length"
        value={keystream}
        onChange={(e) => setKeystream(e.target.value.replace(/[^01]/g, ""))}
      />

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleEncrypt}>Encrypt</button>
        <button style={buttonStyle} onClick={handleDecrypt}>Decrypt</button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Result: {result}</p>

      <p style={sectionStyle}>
        Example: Plaintext <b>PIG</b>, keystream <b>101010110011000</b> produces ciphertext <b>11010001001110</b>.
        Decryption uses the same keystream.
      </p>
    </div>
  );
};

export default OneTimePad;
