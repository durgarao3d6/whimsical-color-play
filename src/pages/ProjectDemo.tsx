import { motion } from "framer-motion";
import Navigation from "../components/Navigation";

const ProjectDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        {/* Project Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Project Title</h1>
          <p className="text-lg text-gray-600 mb-8">
            A comprehensive description of the project, its goals, and the problems it solves.
            This section provides an overview of the technical stack and implementation details.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Node.js</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Responsive Design</li>
                <li>Real-time Updates</li>
                <li>User Authentication</li>
                <li>Data Visualization</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Timeline</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Started: Jan 2024</li>
                <li>Duration: 3 months</li>
                <li>Current Status: Active</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Video Demo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Video Demonstration</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center justify-center">
              <p className="text-gray-500">Video placeholder - Add your demo video here</p>
            </div>
          </div>
        </motion.section>

        {/* Detailed Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Detailed Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((feature) => (
              <motion.div
                key={feature}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3">Feature {feature}</h3>
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