import { useEffect, useRef, useState } from "react";
import { namaSitus } from "../data/data";
import { angka, rupiah, tanggalIndonesia } from "../utils/format";
import { useCart } from "../context/CartContext";

const CONTOH = [["1 Paket Daging Telor", 22000], ["1 Telur Balado", 10000]];
const TOTAL_DEMO = CONTOH.reduce((a, b) => a + b[1], 0);
const MAKS = 5;

// Angka total berhitung naik/turun seperti mesin kasir
function useCountUp(target, dur) {
  const [tampil, setTampil] = useState(0);
  const dari = useRef(0);
  const pertama = useRef(true);

  useEffect(() => {
    const kurangGerak = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const mulaiDari = dari.current;
    const durasi = pertama.current ? 1500 : dur;
    pertama.current = false;
    if (kurangGerak || mulaiDari === target) { dari.current = target; setTampil(target); return; }
    let mulai = null, raf;
    const langkah = (t) => {
      if (mulai === null) mulai = t;
      const p = Math.min(1, (t - mulai) / durasi);
      const nilai = Math.round(mulaiDari + (target - mulaiDari) * (1 - Math.pow(1 - p, 3)));
      dari.current = nilai;
      setTampil(nilai);
      if (p < 1) raf = requestAnimationFrame(langkah);
    };
    raf = requestAnimationFrame(langkah);
    return () => cancelAnimationFrame(raf);
  }, [target, dur]);

  return tampil;
}

export default function Nota() {
  const { cart, total, terakhir } = useCart();
  const ids = Object.keys(cart);
  const mode = terakhir ? "selesai" : ids.length ? "live" : "demo";

  const sumber = mode === "live" ? cart : mode === "selesai" ? terakhir.items : null;
  const target = mode === "live" ? total : mode === "selesai" ? terakhir.total : TOTAL_DEMO;
  const tampil = useCountUp(target, 450);

  const ket = mode === "demo" ? "Contoh pesanan dari Meja 12"
    : mode === "live" ? "Pesananmu (belum dikirim)"
    : `Meja ${terakhir.meja} · pesanan diterima`;
  const pesan = mode === "live" ? "Tinggal satu langkah lagi." : "Duduk dulu, pesanan diantar.";
  const kode = mode === "demo" ? "K88-012" : mode === "live" ? "K88-???" : terakhir.kode;

  // Baris animasi "baru" hanya untuk item yang qty-nya berubah
  const prev = useRef({});
  const barisBaru = (id, qty) => mode === "live" && prev.current[id] !== qty;
  useEffect(() => {
    prev.current = sumber ? Object.fromEntries(Object.entries(sumber).map(([k, v]) => [k, v.qty])) : {};
  });

  return (
    <div className="k88-printer-wrap mx-auto">
      <div className="k88-printer" aria-hidden="true"><span className="k88-led" /><span>Struk pesanan</span></div>
      <div className="k88-feed">
        <div className="k88-nota" role="region" aria-label="Nota pesanan">
          <div className="k88-nota-head">{namaSitus.toUpperCase()}</div>
          <div className="k88-nota-sub">{ket}<br />{tanggalIndonesia()}</div>

          <div className="nota-tubuh">
            <div>
              {mode === "demo" && CONTOH.map(([teks, harga], i) => (
                <div className="nota-baris baru" style={{ animationDelay: `${(0.6 + i * 0.35).toFixed(2)}s` }} key={teks}>
                  <span>{teks}</span><span>{angka(harga)}</span>
                </div>
              ))}
              {sumber && Object.keys(sumber).slice(0, MAKS).map((id) => {
                const it = sumber[id];
                return (
                  <div className={`nota-baris${barisBaru(id, it.qty) ? " baru" : ""}`} key={`${id}-${it.qty}`}>
                    <span>{it.qty} {it.nama}</span><span>{angka(it.harga * it.qty)}</span>
                  </div>
                );
              })}
              {sumber && Object.keys(sumber).length > MAKS && (
                <div className="nota-baris nota-lain">
                  <span>+ {Object.keys(sumber).length - MAKS} item lainnya</span><span />
                </div>
              )}
            </div>
            <div className="k88-nota-total d-flex justify-content-between">
              <span>Total</span>
              <span>
                <span aria-hidden="true">{angka(tampil)}</span>
                <span className="visually-hidden" aria-live="polite">{rupiah(target)}</span>
              </span>
            </div>
            {mode === "selesai" && <div className="k88-stempel" aria-hidden="true">DIPESAN</div>}
          </div>

          <div className="text-center mt-3 fw-semibold">{pesan}</div>
          {mode === "live" && (
            <button type="button" className="btn btn-k88 btn-sm w-100 mt-2"
              data-bs-toggle="offcanvas" data-bs-target="#keranjang">
              Buka keranjang &amp; kirim
            </button>
          )}
          <div className="nota-foot" aria-hidden="true">
            <div className="nota-barcode" />
            <div className="nota-antre"><small>ANTREAN</small><strong>{kode}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
