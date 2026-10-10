import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Now from './components/Now';
import Experience from './components/Experience';
import Work from './components/Work';
import Toolkit from './components/Toolkit';
import Education from './components/Education';
import Contact from './components/Contact';
import { profile } from './data/cv';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-clip">
        <Nav />
        <main>
          <Hero />
          <Now />
          <Experience />
          <Work />
          <Toolkit />
          <Education />
          <Contact />
        </main>
        <footer className="wrap flex flex-wrap justify-between gap-2 border-t border-line py-8 text-sm text-muted">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Press <kbd className="font-mono">⌘K</kbd> to jump anywhere</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
