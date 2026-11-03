import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

function muat() {
  try { return JSON.parse(localStorage.getItem("k88cart") || "{}") || {}; } catch { return {}; }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(muat);          // { id: {nama, harga, qty} }
  const [terakhir, setTerakhir] = useState(null);  // pesanan yang baru dikirim
  const [toast, setToast] = useState(null);        // { pesan, key }

  useEffect(() => {
    try { localStorage.setItem("k88cart", JSON.stringify(cart)); } catch { /* abaikan */ }
  }, [cart]);

  const tambah = useCallback((item) => {
    setCart((c) => ({
      ...c,
      [item.id]: { nama: item.nama, harga: item.harga, qty: (c[item.id]?.qty || 0) + 1 },
    }));
    setTerakhir(null);
    setToast({ pesan: `${item.nama} masuk keranjang`, key: Date.now() });
  }, []);

  const ubahQty = useCallback((id, delta) => {
    setCart((c) => {
      if (!c[id]) return c;
      const qty = c[id].qty + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id]; else next[id] = { ...c[id], qty };
      return next;
    });
  }, []);

  const jumlah = Object.values(cart).reduce((a, it) => a + it.qty, 0);
  const total = Object.values(cart).reduce((a, it) => a + it.harga * it.qty, 0);

  const kirim = useCallback((meja) => {
    const kode = "K88-" + (100 + Math.floor(Math.random() * 900));
    setTerakhir({ items: cart, total, meja, kode });
    setCart({});
    return kode;
  }, [cart, total]);

  const pesanLagi = useCallback(() => setTerakhir(null), []);

  return (
    <CartContext.Provider value={{ cart, jumlah, total, terakhir, toast, tambah, ubahQty, kirim, pesanLagi }}>
      {children}
    </CartContext.Provider>
  );
}
