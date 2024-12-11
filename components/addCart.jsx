"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import CarroLista from "./carroLista";
import { useState } from "react";
import { saveCart, getCart, addToCart } from "@/actions/localStorage";

const AddCart = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const addEvent = () => {
    addToCart(event);
    const cart = getCart();
    console.log(cart)
    setCart(cart);
    handleOpenSheet();
  };

  return (
    <>
      <Button onClick={addEvent} variant="outline" className="w-full text-md">
        <ShoppingCart />
        Comprar
      </Button>
      <CarroLista isOpen={isOpen} setIsOpen={setIsOpen} tickets={cart} />
    </>
  );
};

export default AddCart;
