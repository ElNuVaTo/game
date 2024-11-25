import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import bgModal from "@/assets/bg/bg5.png";

const ModalPortal = ({ children, open, data, variants, onClose }) => {
  useEffect(() => {
    const modalContainer = document.createElement("div");
    modalContainer.setAttribute("id", "modal-root");
    document.body.appendChild(modalContainer);

    return () => {
      document.body.removeChild(modalContainer);
    };
  }, []);

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="Profile"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-hidden"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111010] p-6 rounded-lg shadow-md relative w-[300px] h-[300px]"
          >
            <div
              className="absolute top-0 left-0 rounded-lg"
              style={{
                width: "100%",
                height: "100%",
                backgroundRepeat: "repeat",
                backgroundImage: `url(${bgModal})`,
                opacity: 0.1,
              }}
            />
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default ModalPortal;
