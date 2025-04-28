import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image"; // Using Next.js Image component
import Link from "next/link";

const ViewImagePage: React.FC = () => {
  const router = useRouter();
  const { imageUrl } = router.query;

  // Basic validation for imageUrl
  const isValidUrl =
    typeof imageUrl === "string" && imageUrl.startsWith("http");

  return (
    <>
      <Head>
        <title>View Generated Art - Genie Sketch</title>
        <meta name="description" content="View your generated artwork." />
        {/* Add other relevant meta tags if needed */}
      </Head>

      <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Your Generated Artwork
        </h1>

        {isValidUrl ? (
          <div className="w-full max-w-2xl border rounded-lg shadow-lg overflow-hidden bg-base-200 p-4">
            {/* Use Next.js Image component for optimization */}
            <Image
              src={imageUrl as string}
              alt="Generated artwork"
              width={1024} // Match the generated size
              height={1024} // Match the generated size
              layout="responsive" // Makes the image scale with the container
              priority // Prioritize loading this image as it's the main content
              className="rounded"
            />
            <div className="mt-4 flex justify-center gap-4">
              <a
                href={imageUrl as string}
                download="genie-sketch-art.png" // Suggest a filename
                target="_blank" // Open in new tab might be needed depending on browser for download
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Download Image
              </a>
              <Link href="/" className="btn btn-outline">
                Create Another
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-error">
            <p>Invalid or missing image URL.</p>
            <Link href="/" className="btn btn-primary mt-4">
              Go Back Home
            </Link>
          </div>
        )}
      </main>
    </>
  );
};

export default ViewImagePage;
