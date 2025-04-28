import React from "react";
// Choose icons relevant to art, personalization, relaxation, download
import { FiGift, FiSmile, FiDownload } from "react-icons/fi";
import { FaPalette as FiPalette } from "react-icons/fa";
import { BsStars } from "react-icons/bs"; // For personalization/uniqueness

interface ValuePropositionProps {
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

const ValueProposition: React.FC<ValuePropositionProps> = ({
  features: propFeatures,
}) => {
  const defaultFeatures = [
    {
      icon: <BsStars className="w-10 h-10 text-primary" />,
      title: "Personalized Artistry",
      description:
        "Get unique art styles crafted just for you based on your preferences and prompts.",
    },
    {
      icon: <FiSmile className="w-10 h-10 text-primary" />,
      title: "Relax & Create",
      description:
        "Access a relaxing, creative activity anytime. Unwind and enjoy the joy of coloring.",
    },
    {
      icon: <FiPalette className="w-10 h-10 text-primary" />,
      title: "Diverse Styles",
      description:
        "Explore a constantly updated database of art styles catering to diverse tastes.",
    },
    {
      icon: <FiGift className="w-10 h-10 text-primary" />,
      title: "Freemium Access",
      description:
        "Start for free! Premium options available for exclusive styles and features.",
    },
    {
      icon: <FiDownload className="w-10 h-10 text-primary" />,
      title: "Easy Download & Print",
      description:
        "Download your generated art easily and print it from the comfort of your home.",
    },
  ];

  const features = propFeatures || defaultFeatures;

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Adjust grid columns based on the number of features */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-base-100 rounded-lg shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content/70 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
