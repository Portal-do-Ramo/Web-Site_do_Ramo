const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_SECRET_KEY: process.env.MAPBOX_SECRET_KEY,
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig