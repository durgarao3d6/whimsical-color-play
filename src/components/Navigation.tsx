import { motion } from "framer-motion";

const Navigation = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-secondary"
        >
          Portfolio
        </motion.div>
        <div className="flex gap-6">
          {["About", "Projects", "Skills", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 hover:text-secondary transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;