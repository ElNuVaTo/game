import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const variants = {
  initial: {
    opacity: 0,
    y: -130,
    transition: {
      type: "easeInOut",
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 100,
    },
  },
  exit: {
    opacity: 0,
    y: 130,
    transition: {
      type: "easeInOut",
    },
  },
};

import Register from "./components/Register";

const AuthRegister = () => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="m-auto w-max mt-20"
        >
          <Register />
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default AuthRegister;
