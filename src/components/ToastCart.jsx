import { useEffect, useRef } from "react";
import { Toast } from "bootstrap";
import { useCart } from "../context/CartContext";

export default function ToastCart() {
  const { toast } = useCart();
  const ref = useRef(null);

  useEffect(() => {
    if (toast && ref.current) {
      Toast.getOrCreateInstance(ref.current, { delay: 1600 }).show();
    }
  }, [toast]);

  return (
    <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
      <div ref={ref} className="toast text-bg-dark" role="status" aria-live="polite" aria-atomic="true">
        <div className="toast-body text-center">{toast?.pesan}</div>
      </div>
    </div>
  );
}
