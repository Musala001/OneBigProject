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

const DiffieHellman = () => {
  const [p, setP] = useState("71");
  const [g, setG] = useState("7");
  const [aliceSecret, setAliceSecret] = useState("10");
  const [bobSecret, setBobSecret] = useState("20");
  const [alicePublic, setAlicePublic] = useState("");
  const [bobPublic, setBobPublic] = useState("");
  const [sharedKeyAlice, setSharedKeyAlice] = useState("");
  const [sharedKeyBob, setSharedKeyBob] = useState("");
  const [spyView, setSpyView] = useState("");

  const computePublicKeys = () => {
    const n = BigInt(p);
    const gBig = BigInt(g);
    const a = BigInt(aliceSecret);
    const b = BigInt(bobSecret);

    const u = modExp(gBig, a, n); // Alice's public key
    const v = modExp(gBig, b, n); // Bob's public key

    setAlicePublic(u.toString());
    setBobPublic(v.toString());
    setSpyView(`Spy sees: u = ${u}, v = ${v}`);
  };

  const computeSharedKeys = () => {
    if (!alicePublic || !bobPublic) return;
    const n = BigInt(p);
    const a = BigInt(aliceSecret);
    const b = BigInt(bobSecret);
    const u = BigInt(alicePublic);
    const v = BigInt(bobPublic);

    const K_Alice = modExp(v, a, n); // Alice computes K
    const K_Bob = modExp(u, b, n);   // Bob computes K

    setSharedKeyAlice(K_Alice.toString());
    setSharedKeyBob(K_Bob.toString());
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
      <h1 style={titleStyle}>Diffie-Hellman Key Exchange</h1>

      <p style={sectionStyle}>
        The Diffie-Hellman protocol allows two parties (Alice and Bob) to establish a shared secret key over a public channel. They publicly agree on a prime <b>p</b> and primitive root <b>g</b>, then exchange computed values without revealing their private secrets.
      </p>

      <h2>Public Parameters</h2>
      <input style={inputStyle} type="text" placeholder="Prime p" value={p} onChange={e => setP(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Primitive root g" value={g} onChange={e => setG(e.target.value)} />

      <h2>Private Secrets</h2>
      <input style={inputStyle} type="text" placeholder="Alice's secret a" value={aliceSecret} onChange={e => setAliceSecret(e.target.value)} />
      <input style={inputStyle} type="text" placeholder="Bob's secret b" value={bobSecret} onChange={e => setBobSecret(e.target.value)} />

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={computePublicKeys}>Compute Public Keys</button>
        <button style={buttonStyle} onClick={computeSharedKeys}>Compute Shared Keys</button>
      </div>

      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Alice's public key: {alicePublic}</p>
      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Bob's public key: {bobPublic}</p>
      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Shared key (Alice): {sharedKeyAlice}</p>
      <p style={{ ...sectionStyle, fontWeight: "bold" }}>Shared key (Bob): {sharedKeyBob}</p>
      <p style={{ ...sectionStyle, fontWeight: "bold", color: "#ff0000" }}>{spyView}</p>
    </div>
  );
};

export default DiffieHellman;
