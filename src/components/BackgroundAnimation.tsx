import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * canvas.height;

    const chars = "01";
    const codeSnippets = [
      "const", "function", "=>", "{}", "[]", "if", "for", "while",
      "return", "async", "await", "class", "import", "export",
      "let", "var", "new", "this", "null", "true", "false"
    ];

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text =
          Math.random() > 0.5
            ? chars[Math.floor(Math.random() * chars.length)]
            : codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

        const opacity = Math.random();
        ctx.fillStyle = `rgba(0,255,0,${opacity})`;
        ctx.fillText(text, i * 20, drops[i]);

        if (drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 20;
      }
    };

    let id: number;
    const animate = () => {
      drawMatrix();
      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-50"
      style={{ overflow: "hidden" }}
    >
      {/* Terminal Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          zIndex: -100,
        }}
      />

      {/* Matrix Rain */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          zIndex: -100,
        }}
      />

      {/* Grid */}
      {/*<motion.div
        animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          zIndex: -100,
        }}
      />*/}

      {/* Bracket Decoration 1 */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          fontSize: "128px",
          fontFamily: "monospace",
          color: "rgba(0,255,255,0.4)",
          zIndex: -100,
        }}
      >
        {"{ }"}
      </motion.div>

      {/* Bracket Decoration 2 */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          fontSize: "128px",
          fontFamily: "monospace",
          color: "rgba(0,255,0,0.4)",
          zIndex: -100,
        }}
      >
        {"< />"}
      </motion.div>

      {/* Floating Binary */}
      <motion.div
        animate={{ y: ["-100%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          right: "25%",
          fontSize: "24px",
          fontFamily: "monospace",
          color: "rgba(59,130,246,0.2)",
          whiteSpace: "pre",
          zIndex: -100,
        }}
      >
        {"01010101\n10101010\n01110011\n10001101"}
      </motion.div>

      {/* Cyan Glow Orb */}
      <motion.div
        animate={{ x: ["10%", "90%", "10%"], y: ["20%", "80%", "20%"], scale: [1, 1.5, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(0,200,255,0.3) 40%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: -100,
        }}
      />

      {/* Green Glow Orb */}
      <motion.div
        animate={{ x: ["80%", "20%", "80%"], y: ["70%", "30%", "70%"], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,0,0.5) 0%, rgba(0,200,0,0.3) 40%, transparent 70%)",
          filter: "blur(90px)",
          zIndex: -100,
        }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)",
          zIndex: -100,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
          zIndex: -100,
        }}
      />
    </div>
  );
}
