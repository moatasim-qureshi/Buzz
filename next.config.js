/**@type{import('next').NextConfig} */

const nextConfig ={
    experimental: {
        appDir: true,
        swcPlugins: ["next-super-plugin",{}]
    },
    images: {
        domains:[
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com"
        ]
    
    }
}


module.exports = nextConfig