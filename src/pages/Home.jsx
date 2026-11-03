import { Link } from "react-router-dom";
import Nota from "../components/Nota";
import KartuPaket from "../components/KartuPaket";
import StatusBuka from "../components/StatusBuka";
import { namaSitus, paket } from "../data/data";

export default function Home() {
  return (
    <>
      <section className="k88-hero">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-7">
              <StatusBuka className="mb-3" />
              <h1 className="display-4 fw-bold d-block">
                Selamat Datang di <span className="k88-gold">{namaSitus}</span>
              </h1>
              <p className="lead mb-4">Pesan makanan favoritmu langsung dari meja kamu, tanpa antre.</p>
              <Link className="btn btn-k88 btn-lg" to="/menu">Lihat Menu</Link>
            </div>
            <div className="col-md-5"><Nota /></div>
          </div>
        </div>
      </section>

      <div className="k88-ribbon text-center">
        Menyediakan masakan <strong>SEHAT</strong> &middot; <strong>LEZAT</strong> &middot; <strong>HEMAT</strong> &middot; <strong>HALAL</strong>
      </div>

      <section className="container pt-5">
        <h2 className="k88-title mb-4">Menu Favorit</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
          {paket.map((p) => <KartuPaket key={p.id} item={p} />)}
        </div>
        <div className="text-center mt-4">
          <Link className="btn btn-outline-dark" to="/menu">Lihat semua menu</Link>
        </div>
      </section>
    </>
  );
}
