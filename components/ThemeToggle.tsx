'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const handleToggle = () => {
    setIsPulling(true);
    setTimeout(() => {
      setTheme(isDark ? 'light' : 'dark');
      setIsPulling(false);
    }, 300);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative w-11 h-14 flex flex-col items-center justify-start
                 focus:outline-none group"
    >
      {/* Light Bulb */}
      <motion.div
        className={`rounded-full flex items-center justify-center
                   transition-all duration-300 
                   ${isDark 
                     ? 'bg-gray-700 text-gray-400' 
                     : 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-300/50'
                   }
                   group-hover:scale-105 group-active:scale-95`}
        style={{ width: 40, height: 40 }}
        animate={{
          filter: isDark ? 'brightness(0.5)' : 'brightness(1.2)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'dark' : 'light'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Lightbulb size={22} fill={isDark ? 'none' : 'currentColor'} />
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Pull Cord Line */}
      <motion.div
        className="w-0.5 bg-gradient-to-b from-gray-400 to-gray-500 origin-top"
        initial={{ height: 16 }}
        animate={{ 
          height: isPulling ? 28 : 16,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      />
      
      {/* Pull Cord End (small circle) */}
      <motion.div
        className="w-2 h-2 rounded-full bg-gray-500 shadow-sm"
        initial={{ y: 0 }}
        animate={{ 
          y: isPulling ? 12 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      />
    </button>
  );
}