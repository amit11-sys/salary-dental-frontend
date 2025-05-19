import { Dialog, DialogPanel } from "@headlessui/react";
import ViewOrder from "../ViewOrder";
import { FaXmark } from "react-icons/fa6";

const ViewOrderPopup = ({
  isOpen,
  selectedOrder,
  close,
}: {
  isOpen: boolean;
  selectedOrder?: any;
  close?: any;
}) => {
  const {
    order_id,
    material,
    length,
    width,
    timeline,
    shipping_charges,
    our_price,
  } = selectedOrder;

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div
          className={`fixed inset-0 z-10 bg-black/50 backdrop-blur-sm ${isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <DialogPanel
            transition
            className="w-full max-w-5xl h-full md:h-[80vh] mx-auto bg-white/5 backdrop-blur-2xl rounded-xl shadow-lg duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 overflow-hidden"
          >
            <button
              onClick={close}
              className="absolute top-4 right-6 text-red-400 hover:text-red-600 bg-black rounded-full p-1 text-xs"
              aria-label="Close"
            >
              <FaXmark className="text-lg" />
            </button>
            <div className="h-full overflow-y-auto p-4 bg-white">
              <ViewOrder
                orderId={order_id}
                material={material}
                length={length}
                width={width}
                values={selectedOrder}
                timeline={timeline}
                shipping_charges={shipping_charges}
                price={our_price}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewOrderPopup;
