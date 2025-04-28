import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Link from "next/link"; // Import Link for internal links

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  title?: string;
  faqs?: FAQItem[];
  defaultOpenIndex?: number;
}

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-base-300 last:border-b-0">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium text-lg focus:outline-none"
        onClick={onClick}
      >
        {question}
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <FiMinus className="h-5 w-5 text-primary" />
          ) : (
            <FiPlus className="h-5 w-5 text-primary" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 prose max-w-none text-base-content/80">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC<FAQProps> = ({
  title = "Frequently Asked Questions",
  faqs: propFaqs,
  defaultOpenIndex = -1, // Default to closed
}) => {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const defaultFaqs = [
    {
      question: "How does Genie Sketch create personalized art?",
      answer: (
        <p>
          Genie Sketch uses advanced AI algorithms. You provide a text prompt
          describing what you want (e.g., "a watercolor painting of a fox in a
          forest"), and our AI interprets it to generate a unique image based on
          your description and selected style preferences.
        </p>
      ),
    },
    {
      question: "What kind of art styles can I generate?",
      answer: (
        <p>
          We offer a growing library of styles, from realistic and photographic
          to cartoonish, abstract, watercolor, oil painting, and more. The free
          plan includes basic styles, while premium plans unlock a wider, more
          exclusive range. Explore the{" "}
          <Link href="#screenshots" className="link link-primary">
            gallery
          </Link>{" "}
          for examples!
        </p>
      ),
    },
    {
      question: "Is there a limit to how many images I can generate?",
      answer: (
        <p>
          Our free plan includes a limited number of generations per day to
          allow everyone a chance to try Genie Sketch. Premium plans offer
          significantly more generations, faster processing, and higher priority
          access. See our{" "}
          <Link href="/pricing" className="link link-primary">
            Pricing Page
          </Link>{" "}
          for details.
        </p>
      ),
    },
    {
      question: "How do I download my generated art?",
      answer: (
        <p>
          Once your art is generated, you'll see options to download it directly
          to your device. Downloads are typically provided in standard image
          formats like PNG or JPG, suitable for viewing, sharing, or printing.
          Premium users may have access to higher resolution downloads.
        </p>
      ),
    },
    {
      question: "Can I use the generated images commercially?",
      answer: (
        <p>
          Usage rights depend on the plan you choose. Generally, images
          generated under the free plan are for personal, non-commercial use.
          Some premium plans may offer commercial usage rights. Please refer to
          our Terms of Service and{" "}
          <Link href="/pricing" className="link link-primary">
            Pricing Page
          </Link>{" "}
          for specific licensing information.
        </p>
      ),
    },
    {
      question: "What are the benefits of upgrading to a premium plan?",
      answer: (
        <p>
          Premium plans offer several advantages, including more daily
          generations, access to exclusive art styles, higher resolution
          downloads, faster generation speeds, priority support, and potentially
          commercial usage rights. It's the best way to fully unlock the power
          of Genie Sketch.
        </p>
      ),
    },
  ];

  const faqs = propFaqs || defaultFaqs;

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="bg-base-100 rounded-lg shadow-lg border border-base-200">
          {faqs.map((faq, index) => (
            <FAQItemComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
