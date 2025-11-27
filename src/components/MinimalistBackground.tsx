import { motion } from "framer-motion";

export default function MinimalistBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Clean gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
        }}
      />

      {/* Floating circle 1 */}
      <motion.div
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating circle 2 */}
      <motion.div
        animate={{
          x: ["100%", "0%", "100%"],
          y: ["50%", "0%", "50%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Geometric shape 1 */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: "150px",
          height: "150px",
          border: "1px solid rgba(59, 130, 246, 0.1)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />

      {/* Geometric shape 2 */}
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          bottom: "25%",
          left: "10%",
          width: "180px",
          height: "180px",
          border: "1px solid rgba(139, 92, 246, 0.08)",
          borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
        }}
      />

      {/* Dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(100, 116, 139, 0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          opacity: 0.4,
        }}
      />

      {/* Light rays */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(59, 130, 246, 0.05) 10%, transparent 20%, rgba(139, 92, 246, 0.05) 30%, transparent 40%)",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(248, 250, 252, 0.5) 100%)",
        }}
      />
    </div>
  );
}