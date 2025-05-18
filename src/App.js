import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <Header />
        
        <main>
          <section id="about" className="min-h-screen flex items-center section-container">
      <AboutMe />
          </section>

          <section id="experience" className="section-container bg-gray-100 dark:bg-dark-card">
      <Experience />
          </section>

          <section id="skills" className="section-container">
      <Skills />
          </section>

          <section id="education" className="section-container bg-gray-100 dark:bg-dark-card">
      <Education />
          </section>

          <section id="contact" className="section-container">
      <Contact />
          </section>
        </main>

        <footer className="bg-white dark:bg-dark-card py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Kristián Flak. All rights reserved.</p>
          </div>
        </footer>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
    </ThemeProvider>
  );
}

export default App;




