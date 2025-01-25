import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectDemo = () => {
  const features = [
    {
      title: "Modern Tech Stack",
      description: "Built with React, TypeScript, and Tailwind CSS for a robust and maintainable codebase.",
      icon: "⚛️"
    },
    {
      title: "Responsive Design",
      description: "Fully responsive layout that works seamlessly across all devices and screen sizes.",
      icon: "📱"
    },
    {
      title: "Performance Optimized",
      description: "Optimized for speed and performance with efficient code splitting and lazy loading.",
      icon: "⚡"
    },
    {
      title: "Secure Authentication",
      description: "Implements industry-standard security practices with JWT authentication.",
      icon: "🔒"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Project Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive demonstration of our latest web application showcasing modern technologies and best practices.
          </p>
        </motion.div>

        {/* Project Description */}
        <section className="mb-20">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-secondary">Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg">
              <p className="text-gray-600">
                This project demonstrates the implementation of a modern web application using React and TypeScript. 
                It showcases best practices in frontend development, including component architecture, state management, 
                and responsive design principles.
              </p>
              <div className="flex gap-4 mt-6">
                <Button variant="secondary">
                  View Source
                </Button>
                <Button variant="outline">
                  Live Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Video Demo Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-secondary mb-8">Video Demonstration</h2>
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/placeholder"
              title="Project Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{feature.icon}</span>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore the full potential of our project and see how it can benefit your needs.
          </p>
          <Button variant="secondary" size="lg">
            Schedule a Demo
          </Button>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectDemo;