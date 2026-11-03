import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import KartuMenu from "../components/KartuMenu";
import { kategori, menu, namaSitus, perHalaman } from "../data/data";

export default function Menu() {
  const [params, setParams] = useSearchParams();

  let kat = params.get("kategori") || "semua";
  if (!kategori.some((k) => k.kunci === kat)) kat = "semua";   // abaikan nilai tak dikenal
  const q = (params.get("q") || "").trim();
  const halMinta = parseInt(params.get("hal") || "1", 10) || 1;

  const [input, setInput] = useState(q);
  useEffect(() => setInput(q), [q]);

  // ---------- Saring ----------
  const hasil = menu.filter((m) =>
    (kat === "semua" || m.kat === kat) &&
    (q === "" || m.nama.toLowerCase().includes(q.toLowerCase()))
  );

  // ---------- Pagination ----------
  const totalMenu = hasil.length;
  const totalHalaman = Math.max(1, Math.ceil(totalMenu / perHalaman));
  const hal = Math.min(Math.max(1, halMinta), totalHalaman);
  const tampil = hasil.slice((hal - 1) * perHalaman, hal * perHalaman);

  const ke = (k, cari, h) => {
    const p = { kategori: k, hal: String(h) };
    if (cari) p.q = cari;
    setParams(p);
  };

  return (
    <div className="container pt-5">
      <h1 className="k88-title mb-4">Menu {namaSitus}</h1>

      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4" id="cari">
        <div className="d-flex flex-wrap gap-2" role="group" aria-label="Kategori menu">
          {kategori.map((k) => (
            <button key={k.kunci} type="button"
              className={`btn btn-sm rounded-pill ${k.kunci === kat ? "btn-k88" : "btn-outline-k88"}`}
              aria-current={k.kunci === kat ? "true" : undefined}
              onClick={() => ke(k.kunci, q, 1)}>
              {k.label}
            </button>
          ))}
        </div>

        <form className="d-flex gap-2" role="search"
          onSubmit={(e) => { e.preventDefault(); ke(kat, input.trim(), 1); }}>
          <input className="form-control rounded-pill" type="search" placeholder="Cari menu..."
            aria-label="Cari menu" value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="btn btn-k88 rounded-pill px-4" type="submit">Cari</button>
        </form>
      </div>

      {totalMenu === 0 ? (
        <p className="text-center text-secondary py-5">
          Menu tidak ditemukan. Coba kata kunci lain atau pilih kategori Semua.
        </p>
      ) : (
        <>
          <p className="text-secondary small">Menampilkan {tampil.length} dari {totalMenu} menu.</p>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {tampil.map((m) => <KartuMenu key={m.id} item={m} />)}
          </div>
        </>
      )}

      {totalHalaman > 1 && (
        <nav className="mt-4" aria-label="Halaman menu">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${hal <= 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => ke(kat, q, hal - 1)} aria-label="Halaman sebelumnya">&lsaquo;</button>
            </li>
            {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((n) => (
              <li key={n} className={`page-item ${n === hal ? "active" : ""}`}>
                <button className="page-link" onClick={() => ke(kat, q, n)}>{n}</button>
              </li>
            ))}
            <li className={`page-item ${hal >= totalHalaman ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => ke(kat, q, hal + 1)} aria-label="Halaman berikutnya">&rsaquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
