import { namaHari, namaBulan, jamBuka, jamTutup } from "../data/data";

export const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");
export const angka = (n) => Number(n).toLocaleString("id-ID");

// Ambil komponen waktu menurut zona Asia/Jakarta (seperti date_default_timezone_set di PHP)
export function waktuWib(d = new Date()) {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta", year: "numeric", month: "numeric", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "short", hour12: false,
  }).formatToParts(d).reduce((a, x) => ({ ...a, [x.type]: x.value }), {});
  const hariMap = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  return {
    N: hariMap[p.weekday], j: +p.day, n: +p.month, Y: +p.year,
    G: +p.hour % 24, H: String(+p.hour % 24).padStart(2, "0"), i: p.minute, s: p.second,
  };
}

export function tanggalIndonesia(d) {
  const w = waktuWib(d);
  return `${namaHari[w.N]}, ${w.j} ${namaBulan[w.n]} ${w.Y}`;
}

// Buka: Senin-Jumat, 07.00 sampai sebelum 16.00 WIB
export function statusBuka(d) {
  const w = waktuWib(d);
  return w.N <= 5 && w.G >= jamBuka && w.G < jamTutup;
}
