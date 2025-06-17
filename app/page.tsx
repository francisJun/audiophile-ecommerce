import HeroSection from "@/components/hero-section";
import CategoryGrid from "@/components/category-grid";
import FeaturedProducts from "@/components/featured-products";
import BestGear from "@/components/best-gear";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BestGear />
    </>
  );
}
