import { useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";
import { menuNav } from "../data/data";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { jumlah } = useCart();
  const { pathname } = useLocation();

  // Tutup menu mobile setelah pindah halaman
  useEffect(() => {
    const el = document.getElementById("navUtama");
    if (el && el.classList.contains("show")) Collapse.getOrCreateInstance(el).hide();
  }, [pathname]);

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top k88-nav">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navUtama" aria-controls="navUtama" aria-expanded="false"
          aria-label="Buka menu navigasi">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="d-flex gap-2 ms-auto order-md-last">
          <Link className="btn btn-outline-dark k88-icon" to="/menu" aria-label="Cari menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
            </svg>
          </Link>
          <button className="btn btn-outline-dark k88-icon position-relative" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#keranjang" aria-controls="keranjang"
            aria-label="Buka keranjang">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2.5l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.4-1.1L21 8H6.2" />
              <circle cx="9.5" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" />
            </svg>
            {jumlah > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill k88-badge">{jumlah}</span>
            )}
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navUtama">
          <ul className="navbar-nav me-auto">
            {menuNav.map((m) => (
              <li className="nav-item" key={m.to}>
                <NavLink className="nav-link" to={m.to} end={m.end}>{m.teks}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
