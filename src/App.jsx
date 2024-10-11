import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, ArrowUp, Mail, Menu, X, LinkIcon, Twitter
} from 'lucide-react';
import { CiDollar } from "react-icons/ci";
import { PiPaypalLogoLight } from "react-icons/pi";
import profileImage from "./assets/profile.png";

// Enhanced animations
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Enhanced button hover animation
const buttonHoverAnimation = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const links = [
  // { id: 1, title: 'Twitter', url: 'https://twitter.com/jsfahmi', icon: Twitter },
];

const donationLinks = [
  { id: 1, title: 'Saweria', url: 'https://paypal.me/jsfahmi', icon: CiDollar },
  { id: 2, title: 'PayPal', url: 'https://saweria.co/joesrilfahmi', icon: PiPaypalLogoLight },
];

const ImageSkeleton = () => (
  <div className="w-32 h-32 rounded-full mx-auto mb-8 bg-gray-200 dark:bg-gray-700 animate-pulse" />
);

const EmptyState = ({ theme }) => (
  <motion.div
    variants={fadeInUp}
    className={`text-center p-8 rounded-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-lg`}
  >
    <LinkIcon className={`w-16 h-16 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
    <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
      No Links Added Yet
    </h3>
    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
      Social links will appear here when they're added.
    </p>
  </motion.div>
);

const Sidebar = ({ isOpen, onClose, theme, toggleTheme }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 backdrop-blur-md bg-black/40 z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300
          }}
          className={`fixed top-0 right-0 bottom-0 w-24 ${theme === 'light' ? 'bg-white/80 backdrop-blur-md' : 'bg-gray-800/80 backdrop-blur-md'} z-50 p-4 flex flex-col items-center space-y-6 shadow-2xl`}
        >
          <motion.button
            variants={buttonHoverAnimation}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={onClose}
            className={`p-2 rounded-full ${theme === 'light' ? 'text-gray-600 hover:bg-gray-100/50' : 'text-gray-300 hover:bg-gray-700/50'}`}
          >
            <X size={24} />
          </motion.button>

          <motion.button
            variants={buttonHoverAnimation}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={toggleTheme}
            className={`p-3 rounded-full ${theme === 'light' ? 'bg-gray-100/50 text-gray-800 hover:bg-gray-200/50' : 'bg-gray-700/50 text-white hover:bg-gray-600/50'} transition-colors duration-300`}
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </motion.button>

          {donationLinks.map((link) => (
            <motion.a
              key={link.id}
              variants={buttonHoverAnimation}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${theme === 'light' ? 'bg-gray-100/50 text-gray-800 hover:bg-gray-200/50' : 'bg-gray-700/50 text-white hover:bg-gray-600/50'} transition-colors duration-300`}
            >
              <link.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const SocialLink = ({ link, index, theme }) => {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-3 px-6 py-4 rounded-xl ${theme === 'light' ? 'bg-white text-gray-800 hover:bg-gray-50' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-all duration-300 shadow-lg hover:shadow-xl`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-sm font-semibold opacity-50">{index + 1}</span>
      <Icon size={20} className="flex-shrink-0" />
      <span className="text-lg font-medium">{link.title}</span>
    </motion.a>
  );
};

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  useEffect(() => {
    const img = new Image();
    img.src = profileImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'} transition-colors duration-500`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          {imageLoaded ? (
            <motion.img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-800 shadow-xl"
              animate={{
                rotateY: [0, 360],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }
              }}
            />
          ) : (
            <ImageSkeleton />
          )}
          <motion.h1
            className={`text-4xl font-bold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}
            variants={fadeInUp}
          >
            JSFahmi
          </motion.h1>
          <motion.p
            className={`text-xl mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
            variants={fadeInUp}
          >
            Web Developer
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-4 mb-12"
        >
          {links.length > 0 ? (
            links.map((link, index) => (
              <SocialLink key={link.id} link={link} index={index} theme={theme} />
            ))
          ) : (
            <EmptyState theme={theme} />
          )}
        </motion.div>

        <motion.footer
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className={`text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
        >
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="mb-2">
            <Mail className="inline mr-2" size={16} />
            joesrilfahmi@gmail.com
          </p>
          <p>&copy; {new Date().getFullYear()} JSFahmi. All rights reserved.</p>
        </motion.footer>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              variants={buttonHoverAnimation}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`p-3 rounded-full shadow-lg ${theme === 'light' ? 'bg-white text-gray-800 hover:bg-gray-50' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-all duration-300`}
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          variants={buttonHoverAnimation}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setSidebarOpen(true)}
          className={`p-3 rounded-full shadow-lg ${theme === 'light' ? 'bg-white text-gray-800 hover:bg-gray-50' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-all duration-300`}
        >
          <Menu size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default App;