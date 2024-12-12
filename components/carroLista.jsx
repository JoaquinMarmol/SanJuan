'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import TickedCard from "./tickedCard";
import {removeFromCart, incrementa, decrementa} from "@/actions/localStorage";

export default function CarroLista({isOpen, setIsOpen, tickets}) {
  const [ticketsArray, setTicketsArray] = useState([]);
  
  useEffect(() => {
    setTicketsArray(tickets || []);
  }, [tickets]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = ticketsArray.filter((item) => item.id !== productId);
    removeFromCart(productId);
    setTicketsArray(updatedCart);
  };

  const incrementQuantity = (productId) => {
    incrementa(productId);
    const updatedCart = ticketsArray.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setTicketsArray(updatedCart);
  };

  const decrementQuantity = (productId) => {
    decrementa(productId);
    const updatedCart = ticketsArray.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setTicketsArray(updatedCart);
  };

  return (
    <>
    
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent> 
        <SheetHeader>
          <SheetTitle className="text-xl font-medium pb-4">
            Carrito de Tickets
          </SheetTitle>
        </SheetHeader>

        <div className="w-full border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {ticketsArray.map((ticket) => (
                <TickedCard key={ticket.id} data={ticket} removeFromCart={handleRemoveFromCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
              ))}
              {ticketsArray.length === 0 && (
                <li className="py-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-md font-medium text-gray-900">No hay tickets en el carrito</p>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        {ticketsArray.length > 0 && (
          <SheetFooter>
          <div className="w-full border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-md font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {ticketsArray.reduce((total, ticket) => total + (ticket.current_price * ticket.quantity), 0).toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <Link
                href="/Checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-[#191919] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6a6a6a]"
              >
                Comprar
              </Link>
            </div>
          </div>
        </SheetFooter>
        )}
        
      </SheetContent>
    </Sheet>
    </>
  );
}
