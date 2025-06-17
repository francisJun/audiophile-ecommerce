import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResponsiveImage } from "./ui/responsive-image";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <ResponsiveImage
          sources={{
            mobile: "/assets/home/mobile/image-header.jpg",
            tablet: "/assets/home/tablet/image-header.jpg",
            desktop: "/assets/home/desktop/image-hero.jpg"
          }}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          <div className="text-white text-center md:text-left max-w-xl mx-auto md:mx-0">
            <p className="text-orange-400 text-sm tracking-widest mb-4 uppercase">
              NEW PRODUCT
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              XX99 MARK II
              <br />
              HEADPHONES
            </h1>
            <p className="text-gray-300 mb-8">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href="/product/xx99-mark-two-headphones">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-none">
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
