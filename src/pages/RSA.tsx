import { useState, type CSSProperties } from "react";

// Helper functions
const modExp = (base: bigint, exp: bigint, mod: bigint): bigint => {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
};

// Extended Euclidean Algorithm for modular inverse
const modInverse = (e: bigint, phi: bigint): bigint => {
  let [old_r, r] = [phi, e];
  let [old_s, s] = [1n, 0n];
  let [old_t, t] = [0n, 1n];
  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * t];
    [old_t, t] = [t, old_t - quotient * t];
  }
  if (old_t < 0n) old_t += phi;
  return old_t;
};

const RSA = () => {
  const [p, setP] = useState("61"); // default primes
  const [q, setQ] = useState("53");
  const [e, setE] = useState("17");
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [result, setResult] = useState("");
  const [signMessage, setSignMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  // Computed values
  const n = BigInt(p) * BigInt(q);
  const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);
  const d = modInverse(BigInt(e), phi);

  // Encrypt plaintext
  const handleEncrypt = () => {
    const nums = plaintext.split("").map(c => BigInt(c.charCodeAt(0)));
    const encrypted = nums.map(num => modExp(num, BigInt(e), n).toString()).join(" ");
    setResult(encrypted);
    setCiphertext(encrypted);
  };

  // Decrypt ciphertext
  const handleDecrypt = () => {
    try {
      const nums = ciphertext.split(" ").map(c => BigInt(c));
      const decrypted = nums.map(num => String.fromCharCode(Number(modExp(num, d, n)))).join("");
      setResult(decrypted);
    } catch {
      setResult("Error: Invalid ciphertext or parameters");
    }
  };

  // Sign numeric message
  const handleSign = () => {
    const msgNum = BigInt(signMessage);
    const signature = modExp(msgNum, d, n);
    setSignedMessage(signature.toString());
    setVerificationResult("");
  };

  // Verify signature
  const handleVerify = () => {
    const signatureNum = BigInt(signedMessage);
    const verified = modExp(signatureNum, BigInt(e), n);
    const isValid = verified === BigInt(signMessage);
    setVerificationResult(isValid ? `Valid ✅ (V = ${verified})` : `Invalid ❌ (V = ${verified})`);
  };

  const containerStyle: CSSProperties = {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
  };
  const titleStyle: CSSProperties = { fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" };
  const sectionStyle: CSSProperties = { textAlign: "justify", marginBottom: "1rem", lineHeight: 1.6 };
  const inputStyle: CSSProperties = { width: "80%", maxWidth: "400px", padding: "0.5rem", margin: "0.5rem 0", fontSize: "1rem" };
  const buttonContainerStyle: CSSProperties = { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" };
  const buttonStyle: CSSProperties = { padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer", borderRadius: "4px", backgroundColor: "#1f2937", color: "#fff", border: "none", transition: "background-color 0.3s" };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>RSA Cryptosystem</h1>
      <p style={sectionStyle}>
        RSA allows encryption, decryption, and digital signatures.
        The modulus n = p * q, φ(n) = (p-1)(q-1), and the private key d are computed automatically.
        Formulas:
        <br />Encryption: c ≡ m^e mod n
        <br />Decryption: m ≡ c^d mod n
        <br />Signing: s ≡ m^d mod n
        <br />Verification: m ≡ s^e mod n
      </p>

      <h2>Key Parameters</h2>
      <input style={inputStyle} type="text" placeholder="Prime p" value={p} onChange={e => setP(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Prime q" value={q} onChange={e => setQ(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Public exponent e" value={e} onChange={e => setE(e.target.value)} />
      <p style={sectionStyle}>Computed: n = {n.toString()}, φ(n) = {phi.toString()}, d = {d.toString()}</p>

      <h2>Encrypt / Decrypt</h2>
      <input style={inputStyle} type="text" placeholder="Plaintext" value={plaintext} onChange={e => setPlaintext(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Ciphertext (space-separated numbers)" value={ciphertext} onChange={e => setCiphertext(e.target.value)} />

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleEncrypt}>Encrypt</button>
        <button style={buttonStyle} onClick={handleDecrypt}>Decrypt</button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Result: {result}</p>

      <h2>Digital Signature</h2>
      <input style={inputStyle} type="text" placeholder="Numeric message to sign" value={signMessage} onChange={e => setSignMessage(e.target.value)} />
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleSign}>Sign</button>
        <button style={buttonStyle} onClick={handleVerify}>Verify</button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Signature: {signedMessage}</p>
      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Verification: {verificationResult}</p>
    </div>
  );
};

export default RSA;
