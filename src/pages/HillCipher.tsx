import { useState, type CSSProperties } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const cleanText = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "");

// Convert letter to number 0-25
const letterToNum = (char: string) => alphabet.indexOf(char);

// Convert number 0-25 to letter
const numToLetter = (num: number) => alphabet[num % 26];

// Compute modular inverse of a number modulo m
const modInverse = (a: number, m: number): number | null => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null; // no inverse
};

// Encrypt/decrypt 2x2 Hill Cipher
const hillProcess = (text: string, key: number[][], decrypt = false): { result: string; info: string } => {
  text = cleanText(text);
  let info = "";

  if (text.length % 2 !== 0) text += "X"; // pad if odd length

  let a = key[0][0], b = key[0][1], c = key[1][0], d = key[1][1];

  if (decrypt) {
    const det = ((a * d - b * c) % 26 + 26) % 26;
    const detInv = modInverse(det, 26);
    if (detInv === null) return { result: "", info: "Key matrix not invertible modulo 26!" };

    info += `Determinant = ${det}, Inverse determinant = ${detInv}\n`;

    // Correct inverse matrix modulo 26
    const aNew = (d * detInv) % 26;
    const bNew = ((-b + 26) * detInv) % 26;
    const cNew = ((-c + 26) * detInv) % 26;
    const dNew = (a * detInv) % 26;

    // Ensure positive modulo
    a = (aNew + 26) % 26;
    b = (bNew + 26) % 26;
    c = (cNew + 26) % 26;
    d = (dNew + 26) % 26;

    info += `Inverse matrix modulo 26 = [[${a}, ${b}], [${c}, ${d}]]\n`;
  }

  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    const p1 = letterToNum(text[i]);
    const p2 = letterToNum(text[i + 1]);
    const c1 = (a * p1 + b * p2) % 26;
    const c2 = (c * p1 + d * p2) % 26;
    result += numToLetter(c1) + numToLetter(c2);
  }

  return { result, info };
};

const HillCipher = () => {
  const [text, setText] = useState("");
  const [k11, setK11] = useState("5");
  const [k12, setK12] = useState("17");
  const [k21, setK21] = useState("4");
  const [k22, setK22] = useState("15");
  const [result, setResult] = useState("");
  const [info, setInfo] = useState("");

  const handleEncrypt = () => {
    const key = [
      [parseInt(k11), parseInt(k12)],
      [parseInt(k21), parseInt(k22)],
    ];
    const res = hillProcess(text, key, false);
    setResult(res.result);
    setInfo(res.info);
  };

  const handleDecrypt = () => {
    const key = [
      [parseInt(k11), parseInt(k12)],
      [parseInt(k21), parseInt(k22)],
    ];
    const res = hillProcess(text, key, true);
    setResult(res.result);
    setInfo(res.info);
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

  const keyInputStyle: CSSProperties = {
    width: "50px",
    padding: "0.3rem",
    margin: "0.2rem",
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
      <h1 style={titleStyle}>Hill Cipher (2x2)</h1>

      <p style={sectionStyle}>
        The Hill Cipher is a block cipher based on modular matrix algebra.
        Text is encrypted in blocks of 2 letters using a 2×2 key matrix.
      </p>

      <h2>Enter text</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Enter plaintext or ciphertext"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <h2>Enter 2×2 Key Matrix</h2>
      <div>
        <input style={keyInputStyle} type="number" value={k11} onChange={(e) => setK11(e.target.value)} />
        <input style={keyInputStyle} type="number" value={k12} onChange={(e) => setK12(e.target.value)} />
      </div>
      <div>
        <input style={keyInputStyle} type="number" value={k21} onChange={(e) => setK21(e.target.value)} />
        <input style={keyInputStyle} type="number" value={k22} onChange={(e) => setK22(e.target.value)} />
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleEncrypt}>Encrypt</button>
        <button style={buttonStyle} onClick={handleDecrypt}>Decrypt</button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Result: {result}</p>
      {info && <pre style={{ ...sectionStyle, fontWeight: "bold", color: "#444" }}>{info}</pre>}

      <p style={sectionStyle}>
        Example: Using key matrix <b>[[5,17],[4,15]]</b> and message "THEGOLDISBURIED", the ciphertext should be <b>GZSCXNVCDJZXEOV</b>.
      </p>
    </div>
  );
};

export default HillCipher;
