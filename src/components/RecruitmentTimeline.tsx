import { motion } from "framer-motion";

const timelineSteps = [
  {
    number: 1,
    phase: "PREPARING",
    description: "Preparing Recruitment Plan and Job description"
  },
  {
    number: 2,
    phase: "SOURCING",
    description: "Sourcing Talent"
  },
  {
    number: 3,
    phase: "SCREENING",
    description: "Screening Job Applications"
  },
  {
    number: 4,
    phase: "SELECTING",
    description: "Selecting Suitable Fit"
  },
  {
    number: 5,
    phase: "HIRING",
    description: "Hiring the Chosen Candidate"
  },
  {
    number: 6,
    phase: "ONBOARDING",
    description: "Onboarding the Employee"
  }
];

const RecruitmentTimeline = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Curved Path */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2"
      >
        <svg
          className="w-full h-32"
          viewBox="0 0 1200 100"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50"
            stroke="#34a853"
            strokeWidth="8"
            fill="none"
            strokeDasharray="8 8"
            className="animate-dash"
          />
        </svg>
      </motion.div>

      {/* Timeline Steps */}
      <div className="relative grid grid-cols-6 gap-4 max-w-6xl mx-auto px-4">
        {timelineSteps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className={`flex flex-col items-center ${
              index % 2 === 0 ? "-mt-16" : "mt-16"
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-white rounded-full border-4 border-secondary flex items-center justify-center text-xl font-bold mb-4 shadow-lg"
            >
              {step.number}
            </motion.div>
            <h3 className="text-secondary font-bold text-sm mb-2 text-center">
              {step.phase}
            </h3>
            <p className="text-xs text-gray-600 text-center">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentTimeline;