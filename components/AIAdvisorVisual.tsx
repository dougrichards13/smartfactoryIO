import { motion } from 'framer-motion';

export function AIAdvisorVisual() {
  return (
    <div className="relative w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden border border-border/30">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Grid pattern */}
          <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* AI Ecosystem Image */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Image container with border */}
          <div className="relative">
            <img
              src="/assets/images/ai-ecosystem.jpg"
              alt="AI Data Ecosystem"
              className="w-full max-w-full h-auto object-cover rounded-xl border-2 border-primary/30 shadow-lg"
              style={{ aspectRatio: '675/575', maxHeight: '575px' }}
            />
            
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary/50"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.3)",
                  "0 0 0 4px rgba(59, 130, 246, 0.1)",
                  "0 0 0 0 rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Floating data particles - subtle */}
        <motion.div
          className="absolute top-8 left-12 w-2 h-2 bg-accent rounded-full opacity-60"
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-16 right-20 w-2 h-2 bg-primary rounded-full opacity-60"
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.8,
          }}
        />
        <motion.div
          className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-accent rounded-full opacity-60"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 0.9, 0.5],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: 1.2,
          }}
        />


        {/* Holographic effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear",
            delay: 3 
          }}
        />
      </div>

    </div>
  );
}