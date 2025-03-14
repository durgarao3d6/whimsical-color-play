import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAuth } from "@/contexts/AuthContext";

const ProjectsSection = () => {
  const { user } = useAuth();
  const [projectImages, setProjectImages] = useState<Record<number, string>>({
    1: "https://source.unsplash.com/random/800x600?coding",
    2: "https://source.unsplash.com/random/800x600?technology"
  });

  const handleImageUpload = (projectId: number) => (url: string) => {
    setProjectImages(prev => ({
      ...prev,
      [projectId]: url
    }));
  };

  return (
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
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4 overflow-hidden rounded-lg h-48">
                <img
                  src={projectImages[project]}
                  alt={`Project ${project}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              {user && (
                <div className="mb-4">
                  <ImageUpload onUploadComplete={handleImageUpload(project)} />
                </div>
              )}
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
  );
};

export default ProjectsSection;