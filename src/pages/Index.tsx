import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import FloatingElement from "../components/FloatingElement";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
              Welcome to our
              <span className="text-secondary block">Magical World!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join us on an amazing adventure filled with fun and learning!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Playing!
            </motion.button>
          </motion.div>

          <div className="flex-1 relative h-[500px]">
            <FloatingElement delay={0} className="absolute top-0 left-0">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-lg" />
            </FloatingElement>
            <FloatingElement delay={0.2} className="absolute top-20 left-40">
              <div className="w-24 h-24 bg-secondary/20 rounded-full shadow-lg" />
            </FloatingElement>
            <FloatingElement delay={0.4} className="absolute top-40 left-20">
              <div className="w-40 h-40 bg-secondary rounded-3xl shadow-lg" />
            </FloatingElement>
            <FloatingElement delay={0.6} className="absolute top-60 left-60">
              <div className="w-28 h-28 bg-white/80 rounded-full shadow-lg" />
            </FloatingElement>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;