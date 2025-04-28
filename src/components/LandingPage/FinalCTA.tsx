import React from "react";
import Image from "next/image";
import { useRouter } from "next/router"; // Keeping next/router based on original
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

interface FinalCTAProps {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  logoSrc?: string;
  variant?: "primary" | "secondary" | "error";
  onButtonClick?: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({
  headline = "Endless Art, Infinite Possibilities",
  subtext = "Ready to bring your imagination to life? Start generating unique, personalized art with Genie Sketch in just seconds.",
  buttonText = "Grant My First Wish!",
  buttonLink = "/generate", // Link to generation page
  logoSrc = "/logo/icon.png", // Ensure this path is correct
  variant = "primary",
  onButtonClick,
}) => {
  const router = useRouter();

  const handlePrimaryCtaClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    router.push(buttonLink);
  };

  const bgClass =
    variant === "error"
      ? "bg-gradient-to-r from-error/90 to-error text-error-content"
      : variant === "secondary"
      ? "bg-gradient-to-r from-secondary to-accent text-secondary-content"
      : "bg-gradient-to-r from-primary to-secondary text-primary-content";

  const btnClass =
    variant === "error"
      ? "btn-warning"
      : variant === "secondary"
      ? "btn-accent"
      : "btn-secondary";

  return (
    <div className={`min-h-[60vh] flex items-center justify-center ${bgClass}`}>
      <motion.div
        className="flex flex-col items-center gap-6 text-center max-w-3xl px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {logoSrc && (
          <Image
            src={logoSrc}
            alt="Logo"
            width={100}
            height={100}
            className="object-contain mb-2"
          />
        )}

        <h1 className="text-4xl md:text-5xl font-bold">{headline}</h1>

        <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
          {subtext}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-4">
          <motion.button
            className={`btn btn-lg flex-1 group min-h-[60px] text-lg ${btnClass}`}
            onClick={handlePrimaryCtaClick}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonText}
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <p className="text-primary-content/70 mt-2">
          Start free. No credit card required.
        </p>
      </motion.div>
    </div>
  );
};

export default FinalCTA;
