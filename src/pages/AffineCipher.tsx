import { useState, type CSSProperties } from "react";

// Helper function to find modular inverse of a mod 26
const modInverse = (a: number, m: number): number | null => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null; // inverse doesn't exist
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const AffineCipher = () => {
  const [text, setText] = useState("");
  const [a, setA] = useState(7);
  const [b, setB] = useState(10);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const encrypt = () => {
    setError("");
    if (gcd(a, 26) !== 1) {
      setError("Key 'a' must be coprime with 26!");
      return;
    }
    const encrypted = text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const p = char.charCodeAt(0) - 65;
          const c = (a * p + b) % 26;
          return String.fromCharCode(c + 65);
        }
        return char;
      })
      .join("");
    setResult(encrypted);
  };

  const decrypt = () => {
    setError("");
    if (gcd(a, 26) !== 1) {
      setError("Key 'a' must be coprime with 26!");
      return;
    }
    const aInv = modInverse(a, 26);
    if (aInv === null) {
      setError("Modular inverse of 'a' does not exist!");
      return;
    }
    const decrypted = text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const c = char.charCodeAt(0) - 65;
          const p = (aInv * ((c - b + 26) % 26)) % 26;
          return String.fromCharCode(p + 65);
        }
        return char;
      })
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

  const errorStyle: CSSProperties = {
    color: "red",
    fontWeight: "bold",
    marginTop: "0.5rem",
  };

  const resultStyle: CSSProperties = {
    ...sectionStyle,
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Affine Cipher</h1>

      <p style={sectionStyle}>
        The Affine Cipher is a generalization of the Shift Cipher. It uses the
        formula <b>c = (a * p + b) mod 26</b> for encryption, where <b>a</b> and <b>b</b> are keys. Decryption uses <b>p = a⁻¹ * (c - b) mod 26</b>, where a⁻¹ is the modular inverse of a modulo 26. The key <b>a</b> must be coprime with 26.
      </p>

      <h2 style={{ textAlign: "center", marginTop: "1.5rem" }}>Try it yourself!</h2>

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
        placeholder="Enter key a"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
      />

      <input
        style={inputStyle}
        type="number"
        placeholder="Enter key b"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
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

      {error && <p style={errorStyle}>{error}</p>}

      <p style={resultStyle}>Result: {result}</p>

      <p style={sectionStyle}>
        Example: Using key-pair (a=7, b=10), encrypt the message <i>PLEASE SEND MONEY</i>. Try entering it above and see the result.
      </p>
    </div>
  );
};

export default AffineCipher;
