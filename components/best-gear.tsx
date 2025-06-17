import { ResponsiveImage } from "./ui/responsive-image";

export default function BestGear() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-12">
        {/* Best Gear */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="p-8 sm:p-12 md:p-16 order-2 md:order-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                BRINGING YOU THE BEST AUDIO GEAR
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Audiophile is a premier e-commerce destination for high-quality
                audio gear, specializing in headphones, earphones, speakers, and
                other sound accessories. We cater to music lovers, gamers, and
                audio professionals seeking top-tier sound performance. At
                Audiophile, we curate only the best brands and products to
                ensure our customers enjoy immersive, crystal-clear audio,
                whether at home, on the go, or in the studio. Experience sound
                the way it was meant to be heard.
              </p>
            </div>
            <div className="h-64 sm:h-80 md:h-full w-full order-1 md:order-2 rounded-lg overflow-hidden">
              <ResponsiveImage
                sources={{
                  mobile: "/assets/shared/mobile/image-best-gear.jpg",
                  tablet: "/assets/shared/tablet/image-best-gear.jpg",
                  desktop: "/assets/shared/desktop/image-best-gear.jpg"
                }}
                alt="Best Audio Gear"
                width={1400}
                height={1400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
