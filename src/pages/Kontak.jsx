import { useState } from "react";
import StatusBuka from "../components/StatusBuka";
import { namaSitus, namaKampus, jamBuka, jamTutup, noWa, email } from "../data/data";
import { tanggalIndonesia, waktuWib } from "../utils/format";

const jam = (n) => String(n).padStart(2, "0") + ".00";

export default function Kontak() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [galat, setGalat] = useState("");
  const [sukses, setSukses] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (pesan.trim() === "") {
      setSukses("");
      setGalat("Tulis pesanmu dulu sebelum mengirim.");
      return;
    }
    // Demo: belum disimpan ke database
    const w = waktuWib();
    setGalat("");
    setSukses(`Terima kasih${nama.trim() ? ", " + nama.trim() : ""}. Pesanmu sudah diterima pada ${tanggalIndonesia()}, pukul ${w.H}:${w.i} WIB.`);
    setPesan("");
  };

  return (
    <div className="container pt-5">
      <div className="row g-5">
        <div className="col-md-6">
          <h1 className="k88-title">Kontak</h1>
          <p><StatusBuka /></p>
          <dl className="card card-body k88-info">
            <dt>Lokasi</dt>
            <dd>{namaSitus}, Jl. Taman S. Parman Blok A, Tomang, Grogol Petamburan, Jakarta Barat 11440 (dekat {namaKampus})</dd>
            <dt>Jam buka</dt>
            <dd>Senin sampai Jumat, {jam(jamBuka)} sampai {jam(jamTutup)} WIB</dd>
            <dt>Air minum</dt><dd>Self-service: air putih dan teh tawar</dd>
            <dt>Halal</dt><dd>Menyediakan masakan sehat, lezat, hemat, dan halal</dd>
            <dt>WhatsApp</dt><dd>{noWa}</dd>
            <dt>Email</dt><dd className="mb-0">{email}</dd>
          </dl>
        </div>
        <div className="col-md-6">
          <h2 className="k88-title h3">Kirim pesan</h2>
          {sukses && <div className="alert alert-success">{sukses}</div>}
          {galat && <div className="alert alert-danger">{galat}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="c-nama">Nama</label>
              <input className="form-control" id="c-nama" autoComplete="name" value={nama} onChange={(e) => setNama(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="c-pesan">Pesan</label>
              <textarea className="form-control" id="c-pesan" rows="4" value={pesan} onChange={(e) => setPesan(e.target.value)} />
            </div>
            <button className="btn btn-k88" type="submit">Kirim pesan</button>
          </form>
        </div>
      </div>
    </div>
  );
}
