import { motion } from "framer-motion";

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;