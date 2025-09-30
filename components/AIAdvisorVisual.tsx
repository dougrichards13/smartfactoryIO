import { motion } from 'framer-motion';

export function AIAdvisorVisual() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden border border-border/30">
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

      {/* AI Agent Figure */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* AI Agent Head */}
          <motion.div
            className="relative w-16 h-16 mx-auto mb-2"
            animate={{ 
              y: [0, -4, 0],
              rotateY: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* Head shape */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl relative shadow-lg">
              {/* Neural network pattern on head */}
              <div className="absolute inset-2">
                <svg className="w-full h-full" viewBox="0 0 48 48">
                  <motion.g
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Neural nodes */}
                    <circle cx="12" cy="12" r="2" fill="white" opacity="0.8" />
                    <circle cx="36" cy="12" r="2" fill="white" opacity="0.8" />
                    <circle cx="24" cy="24" r="3" fill="white" opacity="1" />
                    <circle cx="12" cy="36" r="2" fill="white" opacity="0.8" />
                    <circle cx="36" cy="36" r="2" fill="white" opacity="0.8" />
                    
                    {/* Neural connections */}
                    <motion.path
                      d="M12,12 L24,24 L36,12 M12,36 L24,24 L36,36"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.6"
                      animate={{ strokeDasharray: ["0 100", "100 0"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.g>
                </svg>
              </div>
              
              {/* Glowing edge effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.3)",
                    "0 0 0 4px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Eyes */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Body/Torso */}
          <motion.div
            className="w-12 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg mx-auto relative shadow-md"
            animate={{ 
              scaleY: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            {/* Chest indicator */}
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-primary/30 rounded-sm"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Digital patterns */}
            <div className="absolute inset-2">
              <div className="w-full h-full border border-white/20 rounded opacity-30" />
              <div className="absolute top-1 left-1 right-1 h-px bg-white/30" />
              <div className="absolute bottom-1 left-1 right-1 h-px bg-white/30" />
            </div>
          </motion.div>

          {/* Arms */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex justify-between w-20">
            <motion.div
              className="w-2 h-12 bg-slate-600 rounded-full origin-top"
              animate={{ rotate: [0, 15, 0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="w-2 h-12 bg-slate-600 rounded-full origin-top"
              animate={{ rotate: [0, -15, 0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* Floating data particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-60"
            style={{
              left: `${15 + i * 20}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

          {/* Speech/thought bubble */}
        <motion.div
          className="absolute top-2 right-4 bg-white/95 text-gray-800 text-xs px-3 py-2 rounded-lg shadow-lg max-w-36"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Ready to assess your transformation potential?
          </motion.div>
          {/* Speech bubble tail */}
          <div className="absolute bottom-[-6px] left-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/95" />
        </motion.div>

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

      {/* Bottom label */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        AI Business Advisor
      </motion.div>
    </div>
  );
}