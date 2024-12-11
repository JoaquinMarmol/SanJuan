
export default function TickedCard({ data, removeFromCart, incrementQuantity, decrementQuantity }) {

  if (!data) {
    return null;
  }

  return (
    <>
      <li className="flex py-6">
        <div className="flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <span>{data.name}</span>
              </h3>
              <div className="ml-4">
                <div className="flex space-x-3 text-sm">
                  <button
                    className="bg-[#191919] text-white px-2 py-1 rounded-md"
                    onClick={() => decrementQuantity(data.id)}
                  >
                    -
                  </button>
                  <span className="content-center">{data.quantity}</span>
                  <button
                    className="bg-[#191919] text-white px-2 py-1 rounded-md"
                    onClick={() => incrementQuantity(data.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between pt-3">
            <p className="text-gray-500 mt-1 text-md">
              $ {(data.current_price * data.quantity).toFixed(2)}
            </p>

            <div className="flex">
              <button
                onClick={() => removeFromCart(data.id)}
                type="button"
                className="font-medium text-red-600 hover:text-red-500 text-sm"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
