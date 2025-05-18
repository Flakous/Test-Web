import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      content: 'business.flak@gmail.com',
      href: 'mailto:business.flak@gmail.com',
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      content: '+420 776 031 313',
      href: 'tel:+12345678900',
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Location',
      content: 'Prague, Czech Republic',
      href: 'https://www.google.com/maps/place/Praha/@50.0592521,14.1538284,11z/data=!3m1!4b1!4m6!3m5!1s0x470b939c0970798b:0x400af0f66164090!8m2!3d50.0755381!4d14.4378005!16zL20vMDV5d2c?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D',
    },
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
    <>
      <h2 className="heading text-center">Contact Information</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <motion.a
                key={info.title}
                href={info.href}
            target="_blank"
            rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
          >
                <div className="p-3 bg-primary-500 text-white rounded-lg">
                  {info.icon}
        </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
      </div>
              </motion.a>
            ))}
      </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;



