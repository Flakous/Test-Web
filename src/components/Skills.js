import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Scouting',
      skills: [
        { name: 'Data Scouting', level: 90 },
        { name: 'Live Scouting Specific player', level: 90 },
        { name: 'Live Scouting - Finding new players', level: 70 },
        { name: 'Video Scouting', level: 80 }
      ]
    },
    {
      title: 'Analysis Tools',
      skills: [
        { name: 'Wyscout', level: 100 },
        { name: 'Statsbomb and Opta API', level: 87 },
        { name: 'Impect API', level: 65 },
        { name: 'Skillcorner or PPF API', level: 70 }
      ]
    },
    {
      title: 'Technical Skills',
      skills: [
        { name: 'Data Analysis', level: 92 },
        { name: 'Data Engineering', level: 45 },
        { name: 'Match Analysis', level: 90 },
        { name: 'Opposition Analysis', level: 95 }
      ]
    },
    {
      title: 'Software & Tools',
      skills: [
        { name: 'Python', level: 71 },
        { name: 'Tableau', level: 70 },
        { name: 'Power BI', level: 70 },
        { name: 'JS', level: 60 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
    },
    },
  };

  return (
    <>
      <h2 className="heading text-center">Skills & Expertise</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="card hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-heading font-semibold mb-4 text-primary-600 dark:text-primary-400">
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-heading font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Additional Competencies
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Team Leadership',
            'Strategic Planning',
            'Video Analysis',
            'Statistical Analysis',
            'Report Writing',
            'Tactical Understanding',
            'Performance Optimization',
            'Team Communication',
            'Project Management',
            'Data Visualization',
          ].map((skill) => (
            <motion.span
              key={skill}
              className="px-4 py-2 bg-gray-100 dark:bg-dark-card rounded-full text-gray-700 dark:text-gray-300 text-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: '#0ea5e9',
                color: '#ffffff',
              }}
            >
              {skill}
            </motion.span>
        ))}
      </div>
      </motion.div>
    </>
  );
};

export default Skills;



