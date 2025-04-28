import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router"; // Import useRouter
import { RadioGroup } from "@/components/Inputs/Radio"; // Import RadioGroup

const Hero: React.FC = () => {
  const router = useRouter(); // Initialize router

  // State for form inputs
  const [abilityLevel, setAbilityLevel] = useState("beginner");
  const [sheetType, setSheetType] = useState("coloring_sheet");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define content directly or fetch from a modified config
  const title = "Genie Sketch: You Wish it, We Sketch it";
  const subtitle =
    "Immerse yourself in personal creativity. Get unique, downloadable art based on your ideas. Relax, enjoy, and color your world.";
  // const primaryCTAText = "Start Sketching Now"; // Button text changed below
  // const primaryCTALink = "/generate"; // Link removed, handled by button
  const secondaryCTAText = "Explore Styles";
  const secondaryCTALink = "#screenshots"; // Link to screenshots/carousel section

  const abilityLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const sheetTypes = [
    { value: "coloring_sheet", label: "Coloring Sheet" },
    { value: "color_by_numbers", label: "Color by Numbers" },
    { value: "dot_to_dot", label: "Dot-to-Dot" },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/openai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          abilityLevel,
          sheetType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.imageUrl) {
        // Redirect to the view page with the image URL
        router.push(`/view?imageUrl=${encodeURIComponent(data.imageUrl)}`);
      } else {
        throw new Error("No image URL received from the server.");
      }
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Add background image styling here - replace with your actual image path
    // Example: style={{ backgroundImage: "url('/path/to/your/hero-background.jpg')" }}
    <section className="hero min-h-[85vh] bg-cover bg-center bg-no-repeat bg-pattern hero-artistic">
      {/* Overlay for text readability */}
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto px-4 py-16 text-neutral-content z-10 gap-8">
        {/* Input Area */}
        <motion.div
          className="lg:w-1/2 flex flex-col p-6 bg-base-100/20 backdrop-blur-md rounded-lg shadow-xl" // Adjusted width and padding
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-base-content space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Your Art
            </h2>

            {/* Ability Level */}
            <RadioGroup
              label="Ability Level"
              name="abilityLevel"
              options={abilityLevels}
              value={abilityLevel}
              onChange={(e) => setAbilityLevel(e.target.value)}
              inline
              size="sm"
            />

            {/* Sheet Type */}
            <RadioGroup
              label="Sheet Type"
              name="sheetType"
              options={sheetTypes}
              value={sheetType}
              onChange={(e) => setSheetType(e.target.value)}
              inline
              size="sm"
            />

            {/* Prompt Input */}
            <div>
              <label htmlFor="prompt-input" className="label">
                <span className="label-text font-medium">
                  Describe Your Vision
                </span>
              </label>
              <textarea
                id="prompt-input"
                className="textarea textarea-bordered w-full h-24"
                placeholder="e.g., A cat astronaut floating in space, Van Gogh style"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>

            {error && <div className="text-error text-sm">{error}</div>}

            <button
              className={`btn btn-primary w-full mt-4 ${
                isLoading ? "loading" : ""
              }`}
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()} // Disable if loading or prompt is empty
            >
              {isLoading ? "Generating..." : "Generate Art"}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/2 lg:pr-8 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-3">{title}</h1>
          <p className="py-6 text-xl leading-relaxed">{subtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {/* Primary CTA removed as it's handled by the form button */}
            {secondaryCTALink && (
              <Link
                href={secondaryCTALink}
                className="btn btn-outline btn-secondary btn-lg"
              >
                {secondaryCTAText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
      {/* Removed section divider if not needed with background image */}
    </section>
  );
};

export default Hero;
