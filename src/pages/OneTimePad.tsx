import { useState, type CSSProperties } from "react";

// 5-bit binary helpers
const letterToBinary = (char: string) => (char.charCodeAt(0) - 65).toString(2).padStart(5, "0");
const binaryToLetter = (bin: string) => String.fromCharCode(parseInt(bin, 2) + 65);
const textToBinary = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "").split("").map(letterToBinary).join("");
const binaryToText = (binStr: string) => {
  let result = "";
  for (let i = 0; i < binStr.length; i += 5) {
    const block = binStr.slice(i, i + 5);
    if (block.length === 5) result += binaryToLetter(block);
  }
  return result;
};
const xorBinary = (bin1: string, bin2: string) => bin1.split("").map((b, i) => (b === bin2[i] ? "0" : "1")).join("");

const OneTimePad = () => {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [keystream, setKeystream] = useState("");
  const [result, setResult] = useState("");

  // Encrypt plaintext
  const handleEncrypt = () => {
    const plainBinary = textToBinary(plaintext);
    if (keystream.length !== plainBinary.length) {
      setResult(`Error: Keystream length must match plaintext binary length (${plainBinary.length} bits).`);
      return;
    }
    const cipherBinary = xorBinary(plainBinary, keystream);
    setCiphertext(cipherBinary);
    setResult(cipherBinary);
  };

  // Decrypt ciphertext
  const handleDecrypt = () => {
    const cipherBinary = ciphertext.replace(/[^01]/g, "");
    if (keystream.length !== cipherBinary.length) {
      setResult(`Error: Keystream length must match ciphertext length (${cipherBinary.length} bits).`);
      return;
    }
    const plainBinary = xorBinary(cipherBinary, keystream);
    setResult(binaryToText(plainBinary));
  };

  // Generate random keystream matching plaintext length
  const handleGenerateKeystream = () => {
    const plainBinary = textToBinary(plaintext);
    let randomStream = "";
    for (let i = 0; i < plainBinary.length; i++) randomStream += Math.random() < 0.5 ? "0" : "1";
    setKeystream(randomStream);
    setResult("Random keystream generated ✅");
  };

  const containerStyle: CSSProperties = { maxWidth: "800px", margin: "2rem auto", padding: "1rem", textAlign: "center" };
  const titleStyle: CSSProperties = { fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" };
  const inputStyle: CSSProperties = { width: "80%", maxWidth: "400px", padding: "0.5rem", margin: "0.5rem 0", fontSize: "1rem" };
  const buttonContainerStyle: CSSProperties = { display: "flex", justifyContent: "center", gap: "0.5rem", margin: "1rem 0", flexWrap: "wrap" };
  const buttonStyle: CSSProperties = { padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer", borderRadius: "4px", backgroundColor: "#1f2937", color: "#fff", border: "none" };
  const sectionStyle: CSSProperties = { textAlign: "justify", marginBottom: "1rem", lineHeight: 1.6 };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>One-Time Pad (Stream Cipher)</h1>
      <p style={sectionStyle}>
        Each letter is converted to 5-bit binary (A=00000,…,Z=11001). The keystream must be as long as the plaintext in binary. You can also generate a random keystream automatically.
      </p>

      <h2>Plaintext</h2>
      <input style={inputStyle} type="text" placeholder="Enter plaintext" value={plaintext} onChange={e => setPlaintext(e.target.value.toUpperCase())} />

      <h2>Keystream (binary string)</h2>
      <input style={inputStyle} type="text" placeholder="Enter or generate keystream" value={keystream} onChange={e => setKeystream(e.target.value.replace(/[^01]/g, ""))} />

      <h2>Ciphertext (binary)</h2>
      <input style={inputStyle} type="text" placeholder="Ciphertext appears here" value={ciphertext} readOnly />

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleGenerateKeystream}>Generate Random Keystream</button>
        <button style={buttonStyle} onClick={handleEncrypt}>Encrypt</button>
        <button style={buttonStyle} onClick={handleDecrypt}>Decrypt</button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Result: {result}</p>
    </div>
  );
};

export default OneTimePad;
