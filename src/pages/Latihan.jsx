import { Link } from "react-router-dom";
import { namaSitus, menuNav, paket } from "../data/data";
import { rupiah, tanggalIndonesia, waktuWib } from "../utils/format";
import { useNow } from "../hooks";

// Padanan latihan PHP Pertemuan 9 di React/JavaScript
const vString = "Sean", vInteger = 19, vFloat = 3.75, vBoolean = true;
const nama = "huruf kecil", Nama = "Huruf Kapital";   // JavaScript juga case-sensitive
const arrayIndexed = ["Beranda", "Profil", "Kontak"];
const arrayAsosiatif = { nama: "Sean", nim: "825250019" };

const tipe = (v) => (Number.isInteger(v) ? "integer" : typeof v === "number" ? "float" : typeof v);

function salam(jam) {
  if (jam < 11) return "Selamat pagi";
  if (jam < 15) return "Selamat siang";
  if (jam < 18) return "Selamat sore";
  return "Selamat malam";
}

function Kartu({ judul, children }) {
  return (
    <div className="col-md-6">
      <div className="card h-100"><div className="card-body">
        <h2 className="h5">{judul}</h2>
        {children}
      </div></div>
    </div>
  );
}

export default function Latihan() {
  const now = useNow(1000);
  const w = waktuWib(now);
  const hhmmss = `${w.H}:${w.i}:${w.s}`;

  const formatTanggal = [
    ["d-m-Y", "Tanggal-bulan-tahun", `${String(w.j).padStart(2, "0")}-${String(w.n).padStart(2, "0")}-${w.Y}`],
    ["l, d F Y H:i:s", "Nama hari + jam lengkap", `${tanggalIndonesia(now)} ${hhmmss}`],
    ["H:i:s", "Jam 24 jam", hhmmss],
    ["N", "Nomor hari (1 = Senin)", w.N],
  ];

  return (
    <div className="container pt-5">
      <h1 className="fw-bold">Latihan Dasar - Pertemuan 9</h1>
      <p className="text-secondary">
        Pemrograman Antarmuka Pengguna (SI23025). Padanan latihan PHP (variabel, include/require, date(), array)
        dalam versi React untuk situs {namaSitus}.
      </p>

      <div className="row g-4">
        <Kartu judul="1. Variabel">
          <pre className="k88-code-block">{`const vString  = "Sean";
const vInteger = 19;
const vFloat   = 3.75;
const vBoolean = true;`}</pre>
          <table className="table table-sm">
            <thead><tr><th>Variabel</th><th>Nilai</th><th>Tipe</th></tr></thead>
            <tbody>
              {[["vString", vString], ["vInteger", vInteger], ["vFloat", vFloat], ["vBoolean", vBoolean]].map(([n, v]) => (
                <tr key={n}><td>{n}</td><td>{String(v)}</td><td>{tipe(v)}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="mb-1">Output: <strong>Nama: {vString}, Umur: {vInteger}</strong></p>
          <p className="small text-secondary mb-0">Case-sensitive: nama = "{nama}", sedangkan Nama = "{Nama}".</p>
        </Kartu>

        <Kartu judul="2. Komponen (pengganti include / require)">
          <p>Di PHP, halaman disusun dari potongan file lewat include. Di React, potongan itu menjadi komponen:</p>
          <pre className="k88-code-block">{`import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";`}</pre>
          <table className="table table-sm">
            <thead><tr><th>PHP</th><th>React</th></tr></thead>
            <tbody>
              <tr><td>include "header.php"</td><td>&lt;Header /&gt;</td></tr>
              <tr><td>require_once "data.php"</td><td>import dari data.js</td></tr>
              <tr><td>$variabel di template</td><td>{"{variabel}"} di JSX</td></tr>
            </tbody>
          </table>
          <div className="alert alert-light border mb-0">
            Hasil komponen salam: <p className="mb-0 d-inline"><strong>{salam(w.G)}</strong>, selamat datang di {namaSitus}!</p>
          </div>
        </Kartu>

        <Kartu judul="3. Tanggal & waktu (pengganti date())">
          <p className="small text-secondary">Zona waktu Asia/Jakarta diatur lewat <code>Intl.DateTimeFormat</code> di utils/format.js.</p>
          <table className="table table-sm">
            <thead><tr><th>Format PHP</th><th>Keterangan</th><th>Hasil sekarang</th></tr></thead>
            <tbody>
              {formatTanggal.map(([f, ket, hasil]) => (
                <tr key={f}><td><code>{f}</code></td><td>{ket}</td><td>{hasil}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="mb-0">Dalam Bahasa Indonesia: <strong>{tanggalIndonesia(now)}</strong></p>
        </Kartu>

        <Kartu judul="4. Array & Object">
          <pre className="k88-code-block">{`const arrayIndexed = ["Beranda", "Profil", "Kontak"];
arrayIndexed[0];   // ${arrayIndexed[0]}

const arrayAsosiatif = { nama: "Sean", nim: "825250019" };
arrayAsosiatif.nama;   // ${arrayAsosiatif.nama}`}</pre>
          <p className="mb-1">Array dicetak dengan <code>map()</code>:</p>
          <ul>{arrayIndexed.map((isi, i) => <li key={isi}>[{i}] {isi}</li>)}</ul>
          <p className="mb-1">Object (array asosiatif):</p>
          <ul className="mb-0">{Object.entries(arrayAsosiatif).map(([k, v]) => <li key={k}>{k} : {v}</li>)}</ul>
        </Kartu>

        <div className="col-12">
          <div className="card border-warning"><div className="card-body">
            <h2 className="h5">Gabungan : tanggal akses dan daftar menu</h2>
            <p>Diakses pada <strong>{tanggalIndonesia(now)}</strong>, pukul <strong>{hhmmss} WIB</strong>.</p>
            <p className="mb-1">Menu navigasi situs, dicetak dari array <code>menuNav</code>:</p>
            <ol className="mb-3">
              {menuNav.map((m) => (
                <li key={m.to}><Link to={m.to}>{m.teks}</Link> <span className="text-secondary small">({m.to})</span></li>
              ))}
            </ol>
            <p className="mb-1">Daftar paket favorit, dicetak dari array <code>paket</code>:</p>
            <div className="table-responsive">
              <table className="table table-sm table-striped mb-0">
                <thead><tr><th>No</th><th>Nama</th><th>Harga</th></tr></thead>
                <tbody>
                  {paket.map((p, i) => <tr key={p.id}><td>{i + 1}</td><td>{p.nama}</td><td>{rupiah(p.harga)}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
}
