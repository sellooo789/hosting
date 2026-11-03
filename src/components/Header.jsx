import { namaSitus, namaKampus, motto } from "../data/data";
import { tanggalIndonesia, waktuWib } from "../utils/format";
import { useNow } from "../hooks";

export default function Header() {
  const now = useNow(30000);
  const w = waktuWib(now);
  const [depan, belakang] = namaSitus.split("88");

  return (
    <header className="k88-header text-white py-3">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <div className="k88-brand">{depan}<span>88</span>{belakang}</div>
          <small className="k88-motto">{motto}</small>{" "}
          <small className="opacity-75">· {namaKampus}</small>
        </div>
        <div className="text-md-end small">
          <div>Tanggal akses: <strong>{tanggalIndonesia(now)}</strong></div>
          <div>Pukul {w.H}:{w.i} WIB</div>
        </div>
      </div>
    </header>
  );
}
