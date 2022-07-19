const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_SECRET_KEY: process.env.MAPBOX_SECRET_KEY,
    API_URL: process.env.API_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET
  }
}

module.exports = nextConfig