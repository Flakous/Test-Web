import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiAward, FiX } from 'react-icons/fi';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Item ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
            >
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <FiX className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Selected item"
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Education = () => {
  const education = [
    {
      school: 'University of East London',
      degree: 'Master of Science in Sport Science',
      period: '2023 - 2024',
      location: 'London, UK',
      description: 'Specializing in sports performance analysis and data science applications in football.',
      achievements: [
        'Thesis: "Data-Driven Player Recruitment in Professional Football"',
        'Advanced research in performance analysis methodologies',
        'Focus on statistical modeling and predictive analytics'
      ],
      images: [
        '/images/school/IMG_0522.jpeg',
        '/images/school/IMG_0578.jpeg',
        '/images/school/IMG_0630.jpeg',
        '/images/school/IMG_4235.jpeg',
        '/images/school/ca109e60-331c-4da0-b3a0-94d9d31d2831.jpg'
      ],
      thesis: {
        title: 'Data-Driven Player Recruitment in Professional Football',
        images: [
          '/images/school/Thesis name.png',
          '/images/school/Thesis.jpeg',
          '/images/school/Thesis2jpeg.jpeg',
          '/images/school/Thesis 3.jpeg'
        ],
        description: 'Research focused on developing advanced methodologies for player recruitment using data analytics and machine learning.',
      }
    },
    {
      degree: "Bachelor's Degree in Sports Science",
      institution: "VŠTVS Palestra Prague",
      dates: "2019 - 2022",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <h2 className="heading text-center">Education</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {education.map((edu, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="card hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-500 text-white rounded-lg">
                <FiBook className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200">
                  {edu.school || edu.institution}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.degree}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                {edu.period || edu.dates}
              </span>
              {edu.location && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {edu.location}
                </span>
              )}
            </div>

            {edu.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {edu.description}
              </p>
            )}

            {edu.achievements && (
              <div className="space-y-2 mb-6">
                {edu.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <FiAward className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-400">{achievement}</p>
                  </div>
                ))}
              </div>
            )}

            {edu.images && edu.images.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  University Photos
                </h4>
                <ImageGallery images={edu.images} />
              </div>
            )}

            {edu.thesis && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-lg font-heading font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Master's Thesis
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {edu.thesis.description}
                </p>
                <ImageGallery images={edu.thesis.images} />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Education;


