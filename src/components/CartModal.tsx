"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function CartModal() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, checkout } = useAppContext();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-black italic tracking-tighter text-white">YOUR CART</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="text-center text-white/50 mt-10">Your cart is empty.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    {item.product.imageUrl && (
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{item.product.name}</h3>
                      <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                      <p className="text-primary font-black mt-1">${item.product.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/40 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-900">
                <div className="flex justify-between items-center mb-6 text-white font-bold text-lg">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={checkout}
                  className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
