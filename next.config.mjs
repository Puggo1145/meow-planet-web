/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/v1/storage/**',
            },
            {
                protocol: 'https',
                hostname: 'cloud.appwrite.io',
                pathname: '/v1/storage/**',
            },
        ],
    }
};

export default nextConfig;
