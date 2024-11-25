import { motion, AnimatePresence } from "framer-motion";
import FormiRegister from "./components/FormiRegister";

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



const AuthRegister = () => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          key="RegisterAnimation"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-full max-w-72 m-auto mt-10 md:mt-12 lg:mt-14 xl:mt-16 overflow-hidden"
        >
          <FormiRegister />
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default AuthRegister;
