"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CarroLista from "./carroLista";
import { getCart } from "@/actions/localStorage";

export default function CarroFlotante() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const handleOpenSheet = () => {
    const cart = getCart();
    setCart(cart);
    setIsOpen(true);
  };

  return (
    <>
      <span
        onClick={handleOpenSheet}
        className="cursor-pointer fixed top-4 right-4 bg-white text-black p-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        <ShoppingCart size={24} />
      </span>
      <CarroLista isOpen={isOpen} setIsOpen={setIsOpen} tickets={cart} />
    </>
  );
}
