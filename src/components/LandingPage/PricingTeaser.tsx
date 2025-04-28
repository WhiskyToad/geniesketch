import React from "react";
import { useRouter } from "next/router"; // Correct import for App Router is next/navigation if needed, but keeping next/router for now based on original code
import { FiCheckCircle } from "react-icons/fi";

interface PricingTeaserProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  pricingLink?: string;
  freeFeatures?: string[];
  onButtonClick?: () => void;
}

const PricingTeaser: React.FC<PricingTeaserProps> = ({
  title = "Simple, Magical Pricing",
  subtitle = "Start creating for free! Upgrade anytime to unlock premium styles and features.",
  buttonText = "Explore Premium Plans",
  pricingLink = "/pricing",
  freeFeatures = [
    "Generate art from text prompts",
    "Access to basic art styles",
    "Standard resolution downloads",
    "Limited generations per day",
  ],
  onButtonClick,
}) => {
  const router = useRouter();

  const handleCtaClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    router.push(pricingLink);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-base-content/80 mb-8">
          {subtitle}
          <br />
          <span className="text-primary font-semibold">
            Perfect for getting started with AI art generation.
          </span>
        </p>

        <div className="bg-base-100 p-6 rounded-lg shadow-md border border-base-300 inline-block mb-8">
          <h3 className="text-xl font-semibold mb-3">Free Plan Includes:</h3>
          <ul className="list-none space-y-2 text-left">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <FiCheckCircle className="text-success flex-shrink-0" />{" "}
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button
            className="btn btn-primary btn-lg mb-4"
            onClick={handleCtaClick}
          >
            {buttonText}
          </button>
          <p className="text-sm text-base-content/60">
            Cancel anytime. No long-term contracts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
