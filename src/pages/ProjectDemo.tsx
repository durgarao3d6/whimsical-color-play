import { motion } from "framer-motion";
import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Task Tracker React",
    description: "A comprehensive task management application built with React and modern web technologies. Features include task creation, deadline management, priority settings, and real-time updates.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    keyFeatures: [
      "Drag-and-drop task organization",
      "Real-time updates",
      "Priority management",
      "Deadline notifications"
    ],
    timeline: [
      "Started: Jan 2024",
      "Duration: 2 months",
      "Current Status: Active"
    ]
  },
  {
    id: 2,
    title: "React & .NET Chat",
    description: "A real-time chat application leveraging React for the frontend and .NET Core for the backend. Supports multiple chat rooms, file sharing, and user presence indicators.",
    techStack: ["React", "ASP.NET Core", "SignalR", "SQL Server"],
    keyFeatures: [
      "Real-time messaging",
      "File sharing",
      "User presence",
      "Chat history"
    ],
    timeline: [
      "Started: Mar 2024",
      "Duration: 3 months",
      "Current Status: In Development"
    ]
  }
];

const ProjectDemo = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const currentProject = projects[currentProjectIndex];
  const titleText = currentProject.title.split("");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] via-white to-[#d3e4fd]">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Project Selection */}
        <div className="flex justify-center gap-4 mb-10">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => setCurrentProjectIndex(index)}
              className={`px-6 py-3 rounded-lg transition-all ${
                currentProjectIndex === index
                  ? "bg-secondary text-white shadow-lg scale-105"
                  : "bg-white/80 text-gray-600 hover:bg-secondary/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {project.title}
            </motion.button>
          ))}
        </div>

        {/* Project Description */}
        <motion.section
          key={currentProject.id}
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
            {currentProject.description}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Tech Stack",
                items: currentProject.techStack
              },
              {
                title: "Key Features",
                items: currentProject.keyFeatures
              },
              {
                title: "Timeline",
                items: currentProject.timeline
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
            {currentProject.keyFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 }
                }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:border-secondary/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-secondary">{feature}</h3>
                <p className="text-gray-600">
                  Detailed description of {feature.toLowerCase()}, its benefits, and how it enhances
                  the user experience in the {currentProject.title} application.
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