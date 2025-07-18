import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    /* I don't need your cookie, for now. */
                    { key: "Access-Control-Allow-Credentials", value: "false" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "*" },
                    { key: "Access-Control-Allow-Headers", value: "*" },
                ],
            },
        ];
    },
};

export default nextConfig;
