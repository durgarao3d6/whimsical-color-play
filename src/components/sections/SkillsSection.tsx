import { motion } from "framer-motion";

const SkillsSection = () => {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "GraphQL", ".NET", "AWS"];
  
  return (
    <section id="skills" className="py-20 bg-white/50 rounded-3xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-12 text-secondary">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.05, backgroundColor: "#f0fdf4" }}
              className="p-4 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;