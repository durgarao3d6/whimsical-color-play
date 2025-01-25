import { motion } from "framer-motion";
import Navigation from "../components/Navigation";

const ProjectDemo = () => {
  const titleText = "Project Title".split("");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] via-white to-[#d3e4fd]">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        {/* Project Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="overflow-hidden">
            <motion.div className="flex justify-center mb-6">
              {titleText.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.6, 0.01, -0.05, 0.95]
                  }}
                  className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-secondary to-[#0EA5E9] bg-clip-text text-transparent"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          <p className="text-lg text-gray-600 mb-8 animate-fade-in">
            A comprehensive description of the project, its goals, and the problems it solves.
            This section provides an overview of the technical stack and implementation details.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Tech Stack",
                items: ["React", "TypeScript", "Tailwind CSS", "Node.js"]
              },
              {
                title: "Key Features",
                items: ["Responsive Design", "Real-time Updates", "User Authentication", "Data Visualization"]
              },
              {
                title: "Timeline",
                items: ["Started: Jan 2024", "Duration: 3 months", "Current Status: Active"]
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-secondary">{card.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video Demo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
            Video Demonstration
          </h2>
          <motion.div 
            className="aspect-w-16 aspect-h-9 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center">
              <p className="text-gray-500">Video placeholder - Add your demo video here</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Detailed Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#F97316] to-[#FEC6A1] bg-clip-text text-transparent">
            Detailed Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((feature) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: feature * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 }
                }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:border-secondary/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-secondary">Feature {feature}</h3>
                <p className="text-gray-600">
                  Detailed description of the feature, its benefits, and how it enhances
                  the user experience. Include technical details and implementation highlights.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectDemo;
