/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ... other configurations if they exist ...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/private/**", // Adjust pathname if needed, this allows any path under /private/
      },
      // ... other remote patterns if they exist ...
    ],
    // You might already have other image configurations like deviceSizes, etc.
    // Ensure you merge this remotePatterns array correctly.
  },
};

module.exports = nextConfig;
