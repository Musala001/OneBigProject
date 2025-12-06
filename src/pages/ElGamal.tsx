import { useState, type CSSProperties } from "react";

// Modular exponentiation helper
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

// Modular inverse using Extended Euclidean Algorithm
const modInverse = (a: bigint, m: bigint): bigint => {
  let m0 = m,
    x0 = 0n,
    x1 = 1n;
  if (m === 1n) return 0n;
  while (a > 1n) {
    const q = a / m;
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0n) x1 += m0;
  return x1;
};

const ElGamal = () => {
  const [p, setP] = useState("37");
  const [g, setG] = useState("2");
  const [privateKey, setPrivateKey] = useState("31");
  const [message, setMessage] = useState("19");
  const [randomR, setRandomR] = useState("7");
  const [publicKey, setPublicKey] = useState("");
  const [cipher, setCipher] = useState("");
  const [decrypted, setDecrypted] = useState("");

  // For signatures
  const [sigMessage, setSigMessage] = useState("15");
  const [sigR, setSigR] = useState("5");
  const [signature, setSignature] = useState({ y: "", s: "" });
  const [verifyResult, setVerifyResult] = useState("");

  // Compute public key
  const computePublicKey = () => {
    const pBig = BigInt(p);
    const gBig = BigInt(g);
    const a = BigInt(privateKey);
    const b = modExp(gBig, a, pBig);
    setPublicKey(b.toString());
  };

  // Encrypt message
  const encryptMessage = () => {
    const pBig = BigInt(p);
    const gBig = BigInt(g);
    const b = BigInt(publicKey);
    const m = BigInt(message);
    const r = BigInt(randomR);

    const y1 = modExp(gBig, r, pBig);
    const y2 = (m * modExp(b, r, pBig)) % pBig;

    setCipher(`(${y1.toString()}, ${y2.toString()})`);

    // Decrypt automatically for demonstration
    const decryptedMsg =
      (y2 * modInverse(modExp(y1, BigInt(privateKey), pBig), pBig)) % pBig;
    setDecrypted(decryptedMsg.toString());
  };

  // Sign message
  const signMessage = () => {
    const pBig = BigInt(p);
    const a = BigInt(privateKey);
    const r = BigInt(sigR);
    const m = BigInt(sigMessage);

    const y = modExp(BigInt(g), r, pBig);
    const rInv = modInverse(r, pBig - 1n);
    let s = ((m - a * y) * rInv) % (pBig - 1n);
    if (s < 0n) s += pBig - 1n;

    setSignature({ y: y.toString(), s: s.toString() });
  };

  // Verify signature
  const verifySignature = () => {
    const pBig = BigInt(p);
    const b = BigInt(publicKey);
    const y = BigInt(signature.y);
    const s = BigInt(signature.s);
    const m = BigInt(sigMessage);

    const v1 = (modExp(y, s, pBig) * modExp(b, y, pBig)) % pBig;
    const v2 = modExp(BigInt(g), m, pBig);

    setVerifyResult(v1 === v2 ? "Valid Signature ✅" : "Invalid Signature ❌");
  };

  // Inline CSS
  const containerStyle: CSSProperties = {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#111827",
  };

  const titleStyle: CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#1f2937",
  };

  const sectionStyle: CSSProperties = {
    textAlign: "justify",
    marginBottom: "1rem",
    lineHeight: 1.7,
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
    margin: "1rem 0",
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

  const successStyle: CSSProperties = {
    ...resultStyle,
    color: "#007700",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>ElGamal Cryptosystem</h1>

      <p style={sectionStyle}>
        The ElGamal cryptosystem is a public-key system based on the discrete
        logarithm problem. It allows secure encryption and digital signatures.
        Each user selects a large prime <b>p</b>, a primitive root <b>g</b>, and
        a private key <b>a</b>. The public key is <b>b ≡ g^a mod p</b>.
      </p>

      <h2>Setup</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Prime p"
        value={p}
        onChange={(e) => setP(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Primitive root g"
        value={g}
        onChange={(e) => setG(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Private key a"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={computePublicKey}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
        >
          Compute Public Key
        </button>
      </div>
      {publicKey && <p style={{ ...resultStyle }}>Public Key b = {publicKey}</p>}

      <h2>Encryption / Decryption</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Message m"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Random r"
        value={randomR}
        onChange={(e) => setRandomR(e.target.value)}
      />
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={encryptMessage}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
        >
          Encrypt & Decrypt
        </button>
      </div>
      {cipher && <p style={resultStyle}>Ciphertext = {cipher}</p>}
      {decrypted && <p style={resultStyle}>Decrypted Message = {decrypted}</p>}

      <h2>Digital Signature</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Message to sign"
        value={sigMessage}
        onChange={(e) => setSigMessage(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Random r"
        value={sigR}
        onChange={(e) => setSigR(e.target.value)}
      />
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={signMessage}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
        >
          Sign Message
        </button>
        <button
          style={buttonStyle}
          onClick={verifySignature}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
        >
          Verify Signature
        </button>
      </div>
      {signature.y && signature.s && (
        <p style={resultStyle}>
          Signature: (y = {signature.y}, s = {signature.s})
        </p>
      )}
      {verifyResult && <p style={successStyle}>{verifyResult}</p>}
    </div>
  );
};

export default ElGamal;
