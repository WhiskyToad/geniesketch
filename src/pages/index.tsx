import type { ReactElement } from "react";
import Head from "next/head";
import Hero from "@/components/LandingPage/Hero";
import ValueProposition from "@/components/LandingPage/ValueProposition";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import ProductScreenshots from "@/components/LandingPage/ProductScreenshots";
import PricingTeaser from "@/components/LandingPage/PricingTeaser";
import TrustSafety from "@/components/LandingPage/TrustSafety";
import FAQ from "@/components/LandingPage/FAQ";
import FinalCTA from "@/components/LandingPage/FinalCTA";
import getSiteConfig from "@/utils/siteConfig";

const Page = () => {
  const config = getSiteConfig();
  const siteUrl = config.get("site.domain", "https://yourdomain.com"); // Provide default
  const siteTitle = "Genie Sketch"; // Update site title
  const siteTagline = "You Wish it, We Sketch it - AI Art Generator"; // Update tagline
  const pageTitle = `${siteTitle} - ${siteTagline}`;
  const pageDescription =
    "Generate unique, personalized art with Genie Sketch AI. Describe your vision, choose a style, and download your creation. Perfect for coloring, inspiration, and fun!"; // Update description
  const imageUrl = `${siteUrl}${config.get(
    "site.socialImages.ogImage",
    "/images/og-image.jpg"
  )}`; // Provide default OG image
  const keywords =
    "AI art generator, text to image, personalized art, coloring pages, creative tool, art generation, freemium AI"; // Update keywords

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        {/* ... other meta tags remain the same, using updated variables ... */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />
      </Head>
      <Hero />
      <ValueProposition />
      {/* Ensure IDs match links if needed */}
      <div id="screenshots">
        <ProductScreenshots />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="pricing">
        <PricingTeaser />
      </div>
      <TrustSafety /> {/* Kept TrustSafety, can be removed if desired */}
      <FAQ />
      <FinalCTA />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Page;
