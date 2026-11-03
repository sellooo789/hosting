import { Link } from "react-router-dom";
import { namaSitus, namaKampus, noWa, email } from "../data/data";

export default function Footer() {
  return (
    <footer className="k88-footer text-white text-center py-4 mt-5">
      <div className="container">
        <div className="fw-bold">{namaSitus} - {namaKampus}</div>
        <div className="small opacity-75">WhatsApp {noWa} &middot; {email}</div>
        <div className="small mt-2"><Link className="link-light" to="/latihan">Latihan PHP (Pertemuan 9)</Link></div>
        <div className="small opacity-75 mt-1">&copy; {new Date().getFullYear()} {namaSitus}. Seluruh hak dilindungi.</div>
      </div>
    </footer>
  );
}
