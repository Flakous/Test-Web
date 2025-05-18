import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin } from 'react-icons/fi';

const AboutMe = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kristián-flak-811152165/',
      icon: <FiLinkedin className="w-6 h-6" />,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      <motion.div variants={itemVariants} className="order-2 md:order-1">
        <h1 className="heading">About Me</h1>
        <motion.div
          variants={itemVariants}
          className="prose dark:prose-invert lg:prose-lg mb-6"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Hello! I'm a passionate Football Analyst specializing in data-driven insights
            and tactical analysis. With a keen eye for detail and a deep understanding
            of the beautiful game, I help teams and organizations make informed decisions
            through comprehensive analysis and visualization of football data.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            I hold a Master's degree in Sport Science from the University of East London (UEL), 
            backed by a solid professional football background. My keen ability to analyze 
            opponent strategies has been proven essential in elevating team performance. 
            My expertise spans from video and data analysis of matches and players, hands-on 
            coaching to enhance individual performance, to SCOUTING and identifying prospective 
            talent to strengthen RECRUITMENT pipelines. Progress is the benchmark of my work.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Throughout my football career, I have consistently been a difference-maker, 
            and I aim for nothing less in this pursuit.
      </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="order-1 md:order-2 relative"
      >
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl transform rotate-6"></div>
          <img
            src="/images/Main photo.jpeg"
            alt="Kristián Flak"
            className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
