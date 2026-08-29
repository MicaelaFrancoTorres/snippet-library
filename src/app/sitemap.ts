import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://snippet-library-nextjs.vercel.app",
      lastModified: new Date(),
    },
  ];
}