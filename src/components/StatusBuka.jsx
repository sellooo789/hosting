import { statusBuka } from "../utils/format";
import { useNow } from "../hooks";

export default function StatusBuka({ className = "" }) {
  const buka = statusBuka(useNow(60000));
  return buka
    ? <span className={`badge text-bg-success ${className}`}>Buka sekarang</span>
    : <span className={`badge text-bg-secondary ${className}`}>Sedang tutup</span>;
}
