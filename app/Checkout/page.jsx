"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { getCart } from "@/actions/localStorage";

export default function Page() {
  const [paymentInfo, setPaymentInfo] = useState({
    payer_email: "",
    billing_info: {
      document_type: "DNI",
      document_number: "",
      full_name: "",
      email: "",
      phone: "",
      address: "Av. Corrientes 1234",
      city: "Buenos Aires",
      postal_code: "1414",
    },
  });

  const handleCreateIntent = async (e) => {
    e.preventDefault();
    const cart = getCart();

    // Crear una copia actualizada del estado
    let updatedPaymentInfo = { ...paymentInfo };

    if (cart.length == 1) {
      updatedPaymentInfo.event_type_id = cart[0].id;
      updatedPaymentInfo.quantity = cart[0].quantity;
    } else {
      updatedPaymentInfo.combo_id = cart.map((item) => item.id);
    }

    // Actualizar el estado
    setPaymentInfo(updatedPaymentInfo);

    await callApiPayment(updatedPaymentInfo);
  };

  const callApiPayment = async (updatedPaymentInfo) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_PAYMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPaymentInfo),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error al crear la intento de pago:", error);
    }
  };

  // Función para actualizar campos de primer nivel
  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Función para actualizar campos dentro de billing_info
  const handleBillingInfoChange = (field, value) => {
    setPaymentInfo((prev) => ({
      ...prev,
      billing_info: {
        ...prev.billing_info,
        [field]: value,
      },
    }));
  };

  return (
    <main className="bg-[#191919] h-full">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2 max-w-7xl m-auto p-8 sm:p-16">
        <div className="col-span-4">
          <h1 className="text-5xl font-black text-white">Checkout</h1>
        </div>
      </div>

      <div className="bg-gray-50 flex items-center justify-center p-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Detalles del pago
            </h2>
            <p className="text-gray-500">Ingrese sus datos</p>
          </div>

          <form
            onSubmit={(e) => handleCreateIntent(e)}
            className="mt-8 space-y-6"
          >
            <div className="relative">
              <input
                type="email"
                className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Email"
                value={paymentInfo.payer_email}
                onChange={(e) => {
                  handlePaymentInfoChange("payer_email", e.target.value);
                  handleBillingInfoChange("email", e.target.value);
                }}
                required
              />
            </div>

            <div className="relative">
              <input
                type="text"
                className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Nombre Completo"
                value={paymentInfo.billing_info.full_name}
                onChange={(e) =>
                  handleBillingInfoChange("full_name", e.target.value)
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Numero"
                  value={paymentInfo.billing_info.phone}
                  onChange={(e) =>
                    handleBillingInfoChange("phone", e.target.value)
                  }
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="DNI"
                  value={paymentInfo.billing_info.document_number}
                  onChange={(e) =>
                    handleBillingInfoChange("document_number", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <CreditCard className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Pagar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
