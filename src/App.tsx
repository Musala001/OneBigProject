import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Introduction from "./pages/Introduction";
import ShiftCipher from "./pages/ShiftCipher";
import AffineCipher from "./pages/AffineCipher";
import KeywordMixedCipher from "./pages/KeywordMixedCipher";
import SymmetricCipher from "./pages/SymmetricCipher";
import VigenereCipher from "./pages/VigenereCipher";
import HillCipher from "./pages/HillCipher";
import OneTimePad from "./pages/OneTimePad";
import RSA from "./pages/RSA";
import KeyExchange from "./pages/KeyExchange";
import ElGamal from "./pages/ElGamal";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/shift-cipher" element={<ShiftCipher />} />
        <Route path="/affine-cipher" element={<AffineCipher />} />
        <Route path="/keyword-mixed" element={<KeywordMixedCipher />} />
        <Route path="/symmetric-cipher" element={<SymmetricCipher />} />
        <Route path="/vigenere-cipher" element={<VigenereCipher />} />
        <Route path="/hill-cipher" element={<HillCipher />} />
        <Route path="/one-time-pad" element={<OneTimePad />} />
        <Route path="/rsa" element={<RSA />} />
        <Route path="/key-exchange" element={<KeyExchange />} />
        <Route path="/elgamal" element={<ElGamal />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
