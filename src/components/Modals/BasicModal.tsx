import { ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalTitle?: string;
}

const Modal = ({ isOpen, onClose, children, modalTitle }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-[1px] bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#292929] p-4 w-full md:max-w-2xl lg:max-w-2xl xl:max-w-xl relative rounded-lg shadow-md shadow-neutral-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-b-neutral-700">
              <h2 className="text-lg font-poppins-semiBold text-gray-200">{modalTitle}</h2>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-gray-500 transition cursor-pointer"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <div className="py-4" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;