import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react"

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Stablo - Blog Template for Next.js & Sanity CMS",
      template: "%s | Stablo"
    },
    description:
      settings?.description ||
      "Stablo - popular open-source next.js and sanity blog template",
    keywords: ["Swift", "iOS"],
    authors: [{ name: "이창준" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Stablo Template",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar {...settings} />

      <div>{children}<Analytics /></div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
