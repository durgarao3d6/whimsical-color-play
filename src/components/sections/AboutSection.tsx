import { motion } from "framer-motion";

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;