// This file is used to configure Next.js settings
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};
// This configuration allows Next.js to load images from any remote source
// by specifying a wildcard pattern for the hostname.
// This is useful for loading images from various external sources
// without needing to specify each one individually.
// The `protocol` field specifies that both HTTP and HTTPS protocols are allowed.
// The `hostname` field with a wildcard pattern allows any hostname.
// This is useful for loading images from various external sources
// without needing to specify each one individually.
// The `remotePatterns` array can be customized to include specific patterns
// for security purposes, but in this case, it allows all remote images.