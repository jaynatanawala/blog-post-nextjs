/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        DB_URL: `mongodb+srv://admin:zHJFbopYrhj2akm6@cluster0.amv9pc3.mongodb.net/posts?retryWrites=true&w=majority`,
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      DB_URL: `mongodb+srv://admin:zHJFbopYrhj2akm6@cluster0.amv9pc3.mongodb.net/posts?retryWrites=true&w=majority`,
    },
  };
};

module.exports = nextConfig;
