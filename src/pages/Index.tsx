import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import FloatingElement from "../components/FloatingElement";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] to-white">
      <Navigation />
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="pt-32 pb-20 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
                Hi, I'm
                <span className="text-secondary block">Vedullapalli Durgarao</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Full Stack Developer passionate about creating beautiful and functional web applications
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-green-gradient text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            <div className="flex-1 relative">
              <svg className="w-full h-[300px]" viewBox="0 0 800 200">
                {/* Curved path */}
                <motion.path
                  d="M 50 100 C 150 50, 250 150, 350 100 C 450 50, 550 150, 650 100 C 750 50, 850 150, 950 100"
                  fill="none"
                  stroke="#34a853"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeDasharray="1400"
                  strokeDashoffset="1400"
                  className="animate-dash"
                />
                {/* Dashed line overlay */}
                <motion.path
                  d="M 50 100 C 150 50, 250 150, 350 100 C 450 50, 550 150, 650 100 C 750 50, 850 150, 950 100"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="10 10"
                />
                
                {/* Timeline points */}
                <g>
                  {[
                    { x: 100, y: 100, year: "2018", text: ".NET", desc: "Started with .NET" },
                    { x: 350, y: 100, year: "2024", text: "React & .NET Core", desc: "Full Stack Development" },
                    { x: 600, y: 100, year: "2025", text: "Next.js & AI", desc: "Future Goals" }
                  ].map((point, index) => (
                    <g key={index}>
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r="25"
                        fill="white"
                        stroke="#34a853"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      />
                      <motion.text
                        x={point.x}
                        y={point.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#34a853"
                        fontSize="16"
                        fontWeight="bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.2 }}
                      >
                        {index + 1}
                      </motion.text>
                      <motion.text
                        x={point.x}
                        y={point.y - 40}
                        textAnchor="middle"
                        fill="#1a1a1a"
                        fontSize="14"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        {point.year}
                      </motion.text>
                      <motion.text
                        x={point.x}
                        y={point.y + 40}
                        textAnchor="middle"
                        fill="#4a4a4a"
                        fontSize="12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                      >
                        {point.text}
                      </motion.text>
                    </g>
                  ))}
                </g>

                {/* Car icons */}
                <motion.g
                  initial={{ x: -50 }}
                  animate={{ x: 700 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                >
                  <text x="0" y="100" fontSize="24" className="transform -scale-x-100">🚗</text>
                </motion.g>
              </svg>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-secondary">About Me</h2>
            <p className="text-lg text-gray-600">
              I'm a passionate developer with expertise in React, Next.js, and modern web technologies.
              I love creating beautiful and functional applications that solve real-world problems.
            </p>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-white/50 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-12 text-secondary">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "GraphQL", ".NET", "AWS"].map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white rounded-xl shadow-md"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-secondary">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((project) => (
                <motion.div
                  key={project}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-4">Project {project}</h3>
                  <p className="text-gray-600 mb-4">
                    A brief description of the project and the technologies used.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      to="/project-demo" 
                      className="text-secondary hover:underline"
                    >
                      View Demo
                    </Link>
                    <a href="#" className="text-secondary hover:underline">GitHub</a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-secondary">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              I'm always open to new opportunities and interesting projects.
              Feel free to reach out!
            </p>
            <motion.a
              href="mailto:your.email@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-green-gradient text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Send Email
            </motion.a>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Index;
