import type { NextConfig } from "next";
import { BASE_URL } from "@/app/web-config";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
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
