import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ToastCart from "./components/ToastCart";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import Latihan from "./pages/Latihan";
import { namaSitus, namaKampus } from "./data/data";

const judulHalaman = {
  "/": "Home", "/menu": "Menu", "/tentang": "Tentang", "/kontak": "Kontak", "/latihan": "Latihan",
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${judulHalaman[pathname] || "Home"} | ${namaSitus} - ${namaKampus}`;
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/latihan" element={<Latihan />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <ToastCart />
    </>
  );
}
