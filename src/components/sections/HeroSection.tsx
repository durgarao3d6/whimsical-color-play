import { motion } from "framer-motion";
import FloatingElement from "../FloatingElement";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
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
            <motion.path
              d="M 50 100 C 150 50, 250 150, 350 100 C 450 50, 550 150, 650 100 C 750 50, 850 150, 950 100"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 10"
            />
            
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
                    className="cursor-pointer hover:stroke-[3px] transition-all"
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
  );
};

export default HeroSection;