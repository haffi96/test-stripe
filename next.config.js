/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    }
}

module.exports = nextConfig
