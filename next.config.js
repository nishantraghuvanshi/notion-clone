/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:[
            "files.edgestore.dev"
        ]
    },
    target: 'serverless',
}

module.exports = nextConfig
