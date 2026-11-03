import { rupiah } from "../utils/format";
import { useCart } from "../context/CartContext";

export default function KartuPaket({ item }) {
  const { tambah } = useCart();
  return (
    <div className="col">
      <article className="card h-100 k88-paket">
        <div className="k88-paket-judul">{item.nama}</div>
        <div className="card-body d-flex flex-column">
          {item.isi ? (
            <ul className="k88-paket-isi">
              {item.isi.map((baris) => <li key={baris}>{baris}</li>)}
            </ul>
          ) : (
            <p className="small text-secondary">Isi paket: tanya langsung di kantin.</p>
          )}
          <div className="mt-auto">
            <small className="text-secondary">Hanya</small>
            <div className="k88-paket-harga mb-3">{rupiah(item.harga)}</div>
            <button type="button" className="btn btn-k88 w-100" onClick={() => tambah(item)}>
              + Tambah ke Keranjang
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
