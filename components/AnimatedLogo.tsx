import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedLogoProps {
  autoStart?: boolean;
  onHover?: boolean;
  compact?: boolean;
  className?: string;
}

export function AnimatedLogo({ 
  autoStart = false, 
  onHover = false, 
  compact = false, 
  className = '' 
}: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStatic, setShowStatic] = useState(!autoStart && !onHover);

  const words = ['Unblock', 'Ignite', 'Accelerate', 'Multiply', 'Transform'];
  
  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  const startAnimation = () => {
    if (onHover && !isAnimating) {
      setShowStatic(false);
      setIsAnimating(true);
    }
  };

  const resetAnimation = () => {
    if (onHover) {
      setIsAnimating(false);
      setShowStatic(true);
    }
  };

  // Static logo for navigation
  if (showStatic && !isAnimating) {
    return (
      <div 
        className={`flex items-center cursor-pointer ${className}`}
        onMouseEnter={startAnimation}
        onMouseLeave={resetAnimation}
      >
        <span className="font-black text-2xl text-white uppercase tracking-[0.2em] leading-none drop-shadow-lg">
          SMART FACTORY
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center ${className}`}
      onMouseEnter={startAnimation}
      onMouseLeave={resetAnimation}
    >
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div
            className="flex items-center space-x-2 md:space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              if (onHover) {
                setTimeout(() => {
                  setIsAnimating(false);
                  setShowStatic(true);
                }, 1500);
              }
            }}
          >
            {/* Sequential word reveals */}
            {words.map((word, index) => (
              <motion.span
                key={word}
                className={`font-bold text-white/90 ${
                  compact ? 'text-sm md:text-base' : 'text-lg md:text-xl'
                } uppercase tracking-wide`}
                initial={{ 
                  opacity: 0, 
                  y: 10,
                  scale: 0.8 
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  y: [10, 0, 0, -10],
                  scale: [0.8, 1, 1, 0.8]
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.3,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut"
                }}
              >
                {word}
              </motion.span>
            ))}

            {/* Smart Factory reveal */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 0, 360]
              }}
              transition={{
                delay: words.length * 0.3 + 0.2,
                duration: 0.8,
                rotate: {
                  delay: words.length * 0.3 + 0.5,
                  duration: 0.6,
                  ease: "easeInOut"
                }
              }}
            >
              <span className="font-black text-primary text-xl md:text-2xl uppercase tracking-[0.15em] drop-shadow-lg">
                SMART
              </span>
              <span className="font-black text-white text-xl md:text-2xl uppercase tracking-[0.2em] drop-shadow-lg">
                FACTORY
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Smart navigation logo with intro sequence on first load, hover effects thereafter
export function CompactAnimatedLogo({ 
  onHover = true, 
  className = '' 
}: { onHover?: boolean; className?: string }) {
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [showHoverAnimation, setShowHoverAnimation] = useState(false);
  const [showIntroAnimation, setShowIntroAnimation] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showFinalSmart, setShowFinalSmart] = useState(false);

  const words = [
    { text: 'Unblock', color: 'text-accent' }, // Neon green - breakthrough
    { text: 'Ignite', color: 'text-secondary' }, // Warm coral - energy
    { text: 'Accelerate', color: 'text-primary' }, // Electric blue - speed
    { text: 'Multiply', color: 'text-accent-light' }, // Lighter green - growth
    { text: 'Transform', color: 'text-secondary-light' } // Lighter coral - evolution
  ];
  const WORD_DURATION = 3000; // 3 seconds per word - Nike commercial pace

  // Auto-play intro sequence on first mount
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('smartfactory-intro-seen');
    
    if (!hasSeenIntro) {
      const timer = setTimeout(() => {
        setShowIntroAnimation(true);
      }, 1500); // Start intro after header animation completes
      
      return () => clearTimeout(timer);
    } else {
      setHasPlayedIntro(true);
    }
  }, []);

  // Handle word progression
  useEffect(() => {
    if (showIntroAnimation && currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        if (currentWordIndex === words.length - 1) {
          // Last word done, show final SMART
          setShowFinalSmart(true);
        } else {
          setCurrentWordIndex(currentWordIndex + 1);
        }
      }, WORD_DURATION);
      
      return () => clearTimeout(timer);
    }
  }, [showIntroAnimation, currentWordIndex, words.length]);

  const handleIntroComplete = () => {
    setShowIntroAnimation(false);
    setHasPlayedIntro(true);
    sessionStorage.setItem('smartfactory-intro-seen', 'true');
    // Reset for next time
    setCurrentWordIndex(0);
    setShowFinalSmart(false);
  };

  const handleMouseEnter = () => {
    if (onHover && hasPlayedIntro && !showIntroAnimation) {
      setShowHoverAnimation(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasPlayedIntro) {
      setShowHoverAnimation(false);
    }
  };

  // Show intro sequence - words fade in/out in place of 'SMART'
  if (showIntroAnimation) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center space-x-2">
          {/* Animated word position - same space as 'SMART' */}
          <div className="relative inline-block" style={{ minWidth: '160px', textAlign: 'left' }}>
            {!showFinalSmart ? (
              <motion.span
                key={`word-${currentWordIndex}`}
                className={`font-black ${words[currentWordIndex]?.color || 'text-primary'} text-2xl uppercase tracking-[0.15em] drop-shadow-lg`}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ 
                  opacity: [0, 1, 1, 0.7, 0],
                  y: [15, 0, 0, -5, -15],
                  scale: [0.9, 1.05, 1, 0.95, 0.9]
                }}
                transition={{
                  duration: WORD_DURATION / 1000,
                  times: [0, 0.15, 0.75, 0.9, 1],
                  ease: "easeInOut"
                }}
              >
                {words[currentWordIndex]?.text}
              </motion.span>
            ) : (
              // THE HALLELUJAH MOMENT 🎉
              <motion.div className="relative">
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.4, 0.6, 0.3],
                    scale: [0.8, 1.2, 1.4, 1.1]
                  }}
                  transition={{
                    duration: 2.0,
                    times: [0, 0.3, 0.6, 1],
                    ease: "easeOut"
                  }}
                />
                
                {/* Sparkle particles */}
                <motion.div className="absolute -inset-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-accent rounded-full"
                      style={{
                        left: `${10 + (i % 4) * 25}%`,
                        top: `${10 + Math.floor(i / 4) * 60}%`
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1 + 0.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Main SMART text with gradient */}
                <motion.span
                  className="relative font-black text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-2xl uppercase tracking-[0.15em] drop-shadow-lg"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    rotateY: -90,
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: [0.5, 1.2, 1], 
                    rotateY: 0,
                    filter: 'blur(0px)'
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "backOut",
                    scale: {
                      times: [0, 0.6, 1],
                      ease: "backOut"
                    }
                  }}
                  onAnimationComplete={() => {
                    setTimeout(handleIntroComplete, 3000); // Hold the glory for 3 seconds
                  }}
                >
                  SMART
                </motion.span>
              </motion.div>
            )}
          </div>
          
          {/* 'FACTORY' stays constant throughout */}
          <span className="font-black text-white text-2xl uppercase tracking-[0.2em] drop-shadow-lg">
            FACTORY
          </span>
        </div>
      </div>
    );
  }

  // Show static logo with hover effects after intro
  return (
    <div 
      className={`relative flex items-center cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default static logo */}
      <motion.div
        className="flex items-center"
        animate={{ opacity: showHoverAnimation ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-black text-2xl text-white uppercase tracking-[0.2em] leading-none drop-shadow-lg">
          SMART FACTORY
        </span>
      </motion.div>

      {/* Hover animation overlay */}
      <AnimatePresence>
        {showHoverAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="font-black text-primary text-2xl uppercase tracking-[0.15em] drop-shadow-lg mr-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              SMART
            </motion.span>
            <motion.span
              className="font-black text-white text-2xl uppercase tracking-[0.2em] drop-shadow-lg"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              FACTORY
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
