import { Link } from "react-router-dom";
import { namaSitus, namaKampus } from "../data/data";

const langkah = [
  `Duduk di meja yang kosong dan buka situs ${namaSitus.toLowerCase()} dari ponselmu.`,
  "Pilih menu, lalu tekan Tambah ke Keranjang.",
  "Buka keranjang, isi nomor mejamu, lalu kirim pesanan.",
  "Tunggu pesananmu diantar ke meja.",
];

export default function Tentang() {
  return (
    <div className="container pt-5">
      <div className="row g-5">
        <div className="col-md-6">
          <h1 className="k88-title">Tentang {namaSitus}</h1>
          <p>{namaSitus} adalah kantin di lingkungan {namaKampus}. Lewat situs ini, kamu bisa memesan paket dan lauk dari meja tanpa harus berdiri di antrean.</p>
          <p>Pesananmu langsung masuk ke dapur, jadi kamu punya lebih banyak waktu untuk makan, belajar, atau ngobrol dengan teman.</p>
          <Link className="btn btn-k88" to="/menu">Lihat Menu</Link>
        </div>
        <div className="col-md-6">
          <h2 className="k88-title h3">Cara pesan</h2>
          <ol className="list-group list-group-numbered">
            {langkah.map((t) => <li className="list-group-item" key={t}>{t}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
