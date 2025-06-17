import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ResponsiveImage } from "./ui/responsive-image";

export default function FeaturedProducts() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-12">
        {/* ZX9 Speaker */}
        <div className="bg-orange-400 text-white rounded-lg overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center p-8 sm:p-12 md:p-16">
            {/* Background Pattern */}
            <Image
              alt="ZX9 Speaker"
              src="/assets/home/desktop/pattern-circles.svg"
              width={900}
              height={950}
              className="absolute top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[200%] md:w-full h-auto aspect-square md:aspect-auto"
              priority
            />
            <div className="flex justify-center -mb-12 sm:-mb-16 md:-mb-20 z-10">
              <ResponsiveImage
                sources={{
                  mobile: "/assets/home/mobile/image-speaker-zx9.png",
                  tablet: "/assets/home/tablet/image-speaker-zx9.png",
                  desktop: "/assets/home/desktop/image-speaker-zx9.png"
                }}
                alt="ZX9 Speaker"
                width={1400}
                height={1600}
                className="w-40 sm:w-48 md:w-64 lg:w-80 h-auto object-contain"
                priority
              />
            </div>
            <div className="text-center md:text-left z-10 max-w-md mx-auto md:mx-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
                ZX9
                <br />
                SPEAKER
              </h2>
              <p className="text-orange-100 mb-6 sm:mb-8">
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link href="/product/zx9-speaker" className="inline-block">
                <Button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-none text-sm sm:text-base">
                  SEE PRODUCT
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="relative rounded-lg overflow-hidden h-80 sm:h-96 md:h-[32rem] w-full">
          <div className="absolute inset-0 w-full h-full">
            <ResponsiveImage
              sources={{
                mobile: "/assets/home/mobile/image-speaker-zx7.jpg",
                tablet: "/assets/home/tablet/image-speaker-zx7.jpg",
                desktop: "/assets/home/desktop/image-speaker-zx7.jpg"
              }}
              alt="ZX7 Speaker"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative h-full flex flex-col justify-center pl-6 sm:pl-16 md:pl-24 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">ZX7 SPEAKER</h2>
            <Link href="/product/zx7-speaker" className="inline-block">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 sm:px-8 py-3 rounded-none text-sm sm:text-base"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="h-48 sm:h-64 md:h-80 w-full">
            <ResponsiveImage
              sources={{
                mobile: "/assets/home/mobile/image-earphones-yx1.jpg",
                tablet: "/assets/home/tablet/image-earphones-yx1.jpg",
                desktop: "/assets/home/desktop/image-earphones-yx1.jpg"
              }}
              width={1400}
              height={800}
              alt="YX1 Earphones"
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
          <div className="bg-gray-100 rounded-lg p-8 sm:p-12 md:p-16 flex flex-col justify-center h-48 sm:h-64 md:h-80">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              YX1 EARPHONES
            </h2>
            <Link href="/product/yx1-earphones" className="w-fit">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 sm:px-8 py-3 rounded-none text-sm sm:text-base w-full sm:w-auto"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
