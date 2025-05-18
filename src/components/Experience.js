import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiAward, FiCode, FiDatabase, FiCloud, FiX } from 'react-icons/fi';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [errorImages, setErrorImages] = useState({});

  const handleImageLoad = (imageSrc) => {
    setLoadedImages(prev => ({ ...prev, [imageSrc]: true }));
  };

  const handleImageError = (imageSrc) => {
    console.error(`Failed to load image: ${imageSrc}`);
    setErrorImages(prev => ({ ...prev, [imageSrc]: true }));
  };

  // Function to encode the image path properly
  const encodeImagePath = (path) => {
    return path.split('/')
      .map(segment => segment.includes(' ') || /[^\x00-\x7F]/.test(segment) 
        ? encodeURIComponent(segment)
        : segment)
      .join('/');
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => {
          const encodedPath = encodeImagePath(image);
          return (
            <motion.div
              key={index}
              className="relative aspect-square cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(encodedPath)}
            >
              {!loadedImages[encodedPath] && !errorImages[encodedPath] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={encodedPath}
                alt={`Item ${index + 1}`}
                className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                  loadedImages[encodedPath] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(encodedPath)}
                onError={() => handleImageError(encodedPath)}
              />
              {errorImages[encodedPath] && (
                <div className="absolute inset-0 flex items-center justify-center text-red-500">
                  <span>Failed to load image</span>
                </div>
              )}
            </motion.div>
          );
        })}
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

const Experience = () => {
  const experiences = [
    {
      title: 'Lead Recruitment Analyst',
      company: 'AC Sparta Praha',
      period: '20.08.2024 - Present',
      location: 'Prague, Czech Republic',
      description: 'Leading the recruitment analysis department and providing data-driven insights for player scouting.',
      achievements: [
        'Lead the sourcing and analysis of diverse internal and external data sources',
        'Produce detailed data profiles for target players using advanced analytical tools, aligning with the club\'s recruitment strategy',
        'Live scouted multiple leagues and players',
        '"Eye test" the data driven approach (I\'m still more of a "football guy" than "data guy")',
        'Support ongoing improvements to scouting systems and processes'
      ],
      skills: ['Data Analysis', 'Player Recruitment', 'Scouting', 'Performance Analysis'],
      icon: <FiBriefcase className="w-6 h-6" />,
      images: [
        '/images/Lead Recruitment Analyst/2.png',
        '/images/Lead Recruitment Analyst/3.png',
        '/images/Lead Recruitment Analyst/Scouting/0B61B93E-50D4-44A5-82F4-A5E7AFDD31FD.jpg',
        '/images/Lead Recruitment Analyst/Scouting/1295adac-b368-428b-8f8c-9c54bebe00cf.jpg',
        '/images/Lead Recruitment Analyst/Scouting/23310E2C-6EB3-456A-AB0D-66D14509BBDE.jpg',
        '/images/Lead Recruitment Analyst/Scouting/D1D03E15-A3A6-434E-858F-071DE9E430BC_1_105_c.jpeg',
        '/images/Lead Recruitment Analyst/Scouting/D492D1D1-0B83-43C5-B590-3343436790BB_1_105_c.jpeg'
      ],
      projects: [
        {
          title: 'Player Scouting System',
          period: 'Sept 2024 - Nov 2024',
          description: 'Developed and implemented a comprehensive player scouting methodology.',
          achievements: [
            'Created standardized evaluation criteria for different positions',
            'Implemented data-driven rating system',
            'Developed automated player comparison tools',
            'Integrated video analysis workflows'
          ],
          icon: <FiDatabase className="w-5 h-5" />,
          skills: ['Data Modeling', 'Scout Coordination', 'Performance Metrics'],
          images: [
            '/images/Lead Recruitment Analyst/Scouting/0B61B93E-50D4-44A5-82F4-A5E7AFDD31FD.jpg',
            '/images/Lead Recruitment Analyst/Scouting/1295adac-b368-428b-8f8c-9c54bebe00cf.jpg'
          ]
        },
        {
          title: 'Scout AI Planner',
          period: 'Dec 2024 - Feb 2025',
          description: 'Designed and developed an AI-powered scouting planning system.',
          achievements: [
            'Created ML models for player potential prediction',
            'Automated scout assignment based on location and expertise',
            'Implemented priority-based scheduling system',
            'Developed real-time reporting dashboard'
          ],
          icon: <FiCode className="w-5 h-5" />,
          skills: ['Machine Learning', 'Python', 'Automation', 'AI Development'],
          images: [
            '/images/Lead Recruitment Analyst/Scoutin AI/Matches.png',
            '/images/Lead Recruitment Analyst/Scoutin AI/Planner.png',
            '/images/Lead Recruitment Analyst/Scoutin AI/Planner2.png'
          ]
        },
        {
          title: 'Cloud Scouting Platform',
          period: 'Mar 2025 - Present',
          description: 'Built a comprehensive web-based scouting platform for the club.',
          achievements: [
            'Developed cloud-based scouting database',
            'Created real-time collaboration tools',
            'Implemented mobile-first design for scouts',
            'Integrated with existing club systems'
          ],
          icon: <FiCloud className="w-5 h-5" />,
          skills: ['Cloud Architecture', 'Web Development', 'Database Design'],
          images: [
            '/images/Lead Recruitment Analyst/Scouting Platform/Platform.png'
          ]
        }
      ]
    },
    {
      title: 'Head of Analysis',
      company: 'DAC Dunajska Streda',
      period: '17.11.2023 - 20.08.2024',
      location: 'Dunajská Streda, Slovakia',
      description: 'Led video, DATA and performance analysis operations across all levels of the club.',
      achievements: [
        <div key="highlight" className="bg-primary-100 dark:bg-primary-900/50 p-4 rounded-lg mb-4 text-lg font-semibold text-primary-900 dark:text-primary-100">
          • Achieved two back to back 2nd-place finishes — the club's best results in the history, with the record points earned.<br/>
          • Identified and sold two players, Krstović and Bajo, for record transfer fees.
        </div>,
        'Created pre- and post-match opposition analysis presentations',
        'Collaborated with Premier League Coach Xisco Muñez developing a game model and creating Scouting Analysis department',
        'Produced data-based reports on team and league-wide trends',
        'Led video and performance analysis operations'
      ],
      skills: ['Video Analysis', 'Performance Analysis', 'Team Leadership', 'Game Model Development'],
      icon: <FiBriefcase className="w-6 h-6" />,
      images: [
        '/images/Head of Analysis/IMG_1120.jpeg',
        '/images/Head of Analysis/Analysis structure.png',
        '/images/Head of Analysis/fbd4fdb9-14fd-4424-8a64-a13de0b771ed.jpg',
        '/images/Head of Analysis/Medals.jpg'
      ]
    },
    {
      title: 'Coach Analyst',
      company: 'DAC Dunajska Streda',
      period: '01.01.2023 - 17.11.2023',
      location: 'Dunajská Streda, Slovakia',
      description: 'Combined coaching expertise with analytical insights to enhance team performance.',
      achievements: [
        'Conducted opposition analysis and identified pressing patterns',
        'Created scouting dashboards and KPIs',
        'Provided live tagging and feedback during matches',
        'Prepared training sessions with first-team coaching staff'
      ],
      skills: ['Opposition Analysis', 'Live Analysis', 'Training Design', 'Performance Metrics'],
      icon: <FiBriefcase className="w-6 h-6" />,
      images: [
        '/Coach Analyst/70EB44EC-15C3-4E24-85ED-A26E1C5C81A6.jpeg',
        '/Coach Analyst/A77780A8-0796-4F01-A5E1-228B80B892D7_1_105_c.jpeg',
        '/Coach Analyst/46a66b1f-ab59-4fc6-acc9-6cc2d8430da5.jpg',
        '/Coach Analyst/16.png',
        '/Coach Analyst/14.png',
        '/Coach Analyst/12.png'
      ]
    },
    {
      title: 'Opposition Analyst',
      company: 'DAC Dunajska Streda',
      period: '2022',
      location: 'Dunajská Streda, Slovakia',
      description: 'Specialized in opposition analysis using advanced tools and methodologies.',
      achievements: [
        'Analyzed opposition using video and data (Opta API + Metrica)',
        'Assisted with match preparation strategies',
        'Utilized Wyscout and Hudl for comprehensive analysis',
        'Developed tactical counter-strategies'
      ],
      skills: ['Opta API', 'Metrica', 'Wyscout', 'Hudl'],
      icon: <FiBriefcase className="w-6 h-6" />,
      images: [
        '/images/Opposition Analyst/1.png',
        '/images/Opposition Analyst/2.png',
        '/images/Opposition Analyst/3.png',
        '/images/Opposition Analyst/4.png',
        '/images/Opposition Analyst/Middle Block 4:1:4:1.png',
        '/images/Opposition Analyst/Obrázek1.png',
        '/images/Opposition Analyst/pressing POD.png',
        '/images/Opposition Analyst/PHOTO-2024-12-03-13-46-34.jpg'
      ]
    },
    {
      title: 'Junior Football Editor',
      company: 'Canal+',
      period: '2022',
      location: 'Prague, Czech Republic',
      description: 'Handled football content editing and analysis using specialized software.',
      achievements: [
        'Operated Pierro / RT Sports software',
        'Analyzed football matches for broadcast',
        'Created compelling match highlights',
        'Contributed to match day coverage'
      ],
      skills: ['Pierro', 'RT Sports', 'Video Editing', 'Match Analysis'],
      icon: <FiBriefcase className="w-6 h-6" />,
      image: '/images/Junior Football Editor'
    },
    {
      title: 'Professional Football Player',
      company: 'Multiple Clubs',
      period: '2017-2022',
      location: 'Various Locations',
      description: 'Played professionally for AC Sparta Praha, FK Liepāja, Makedonikos FC, and MFK Liptovský Mikuláš.',
      achievements: [
        'Developed at one of the world\'s top football academies',
        'Gained deep insights into player psychology',
        'Experienced diverse football cultures and tactics',
        'Built strong understanding of team dynamics'
      ],
      skills: ['Professional Football', 'Team Leadership', 'Tactical Understanding', 'Performance'],
      icon: <FiBriefcase className="w-6 h-6" />,
      image: '/images/football-player'
    }
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <h2 className="heading text-center">Professional Journey</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-900" />

        {experiences.map((experience, index) => (
          <motion.div
          key={index}
            variants={itemVariants}
            className={`relative flex md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            } items-center md:items-start gap-8 mb-16`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-bg" />

            {/* Content */}
            <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
              <motion.div
                className="card hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-500 text-white rounded-lg">
                    {experience.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-800 dark:text-gray-200">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {experience.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                    {experience.period}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {experience.location}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {experience.description}
                </p>

                <div className="space-y-2 mb-4">
                  {experience.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FiAward className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-400">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {experience.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {experience.images && experience.images.length > 0 && (
                  <ImageGallery images={experience.images} />
                )}

                {experience.projects && (
                  <div className="mt-8 space-y-6">
                    <h4 className="text-lg font-heading font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Key Projects
                    </h4>
                    {experience.projects.map((project, i) => (
                      <motion.div
                        key={i}
                        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary-500/10 text-primary-500 rounded-lg">
                            {project.icon}
                          </div>
                          <div>
                            <h5 className="font-heading font-semibold text-gray-800 dark:text-gray-200">
                              {project.title}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {project.period}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {project.description}
                        </p>

                        <div className="space-y-2 mb-3">
                          {project.achievements.map((achievement, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <FiAward className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {achievement}
                              </p>
        </div>
      ))}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {project.skills.map((skill, j) => (
                            <span
                              key={j}
                              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {project.images && project.images.length > 0 && (
                          <ImageGallery images={project.images} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Experience;