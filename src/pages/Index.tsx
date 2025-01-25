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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 mb-32">
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

            <div className="flex-1 relative h-[500px]">
              <FloatingElement delay={0} className="absolute top-0 left-0">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-4xl">💻</span>
                </div>
              </FloatingElement>
              <FloatingElement delay={0.2} className="absolute top-20 left-40">
                <div className="w-24 h-24 bg-secondary/20 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
              </FloatingElement>
              <FloatingElement delay={0.4} className="absolute top-40 left-20">
                <div className="w-40 h-40 bg-green-gradient rounded-3xl shadow-lg flex items-center justify-center">
                  <span className="text-5xl">⚡</span>
                </div>
              </FloatingElement>
              <FloatingElement delay={0.6} className="absolute top-60 left-60">
                <div className="w-28 h-28 bg-white/80 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
              </FloatingElement>
              <FloatingElement delay={0.8} className="absolute top-10 right-20">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-3xl">🌳</span>
                </div>
              </FloatingElement>
              <FloatingElement delay={1.0} className="absolute top-40 right-0">
                <div className="w-28 h-28 bg-red-100 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-3xl">🚌</span>
                </div>
              </FloatingElement>
            </div>
          </div>

          {/* Timeline Road Background */}
          <div className="relative w-full h-48 mt-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-16 bg-gray-800 relative">
                {/* Road markings */}
                <div className="absolute inset-y-0 w-full flex justify-between items-center">
                  <div className="w-full h-2 bg-white" style={{ maskImage: 'repeating-linear-gradient(to right, white 0px, white 20px, transparent 20px, transparent 40px)' }}></div>
                </div>
                
                {/* Timeline points with cars */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-12 left-0 flex justify-between w-full px-4"
                >
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl transform -scale-x-100">🚗</span>
                      </div>
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="max-w-[150px]"
                      >
                        <p className="font-bold text-gray-800">2018</p>
                        <p className="text-sm text-gray-600">.NET</p>
                        <p className="text-xs text-gray-500 mt-1">Started journey with .NET Framework, building enterprise applications</p>
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl transform -scale-x-100">🚙</span>
                      </div>
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                        className="max-w-[150px]"
                      >
                        <p className="font-bold text-gray-800">2024</p>
                        <p className="text-sm text-gray-600">React & .NET Core</p>
                        <p className="text-xs text-gray-500 mt-1">Mastered modern web development with React and .NET Core microservices</p>
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl transform -scale-x-100">🚓</span>
                      </div>
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                        className="max-w-[150px]"
                      >
                        <p className="font-bold text-gray-800">2025</p>
                        <p className="text-sm text-gray-600">Next.js & AI</p>
                        <p className="text-xs text-gray-500 mt-1">Exploring Next.js and AI integration for innovative solutions</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
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
