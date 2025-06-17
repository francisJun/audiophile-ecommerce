import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "HEADPHONES",
    slug: "headphones",
    image: "/assets/shared/desktop/image-category-thumbnail-headphones.png"
  },
  {
    name: "SPEAKERS",
    slug: "speakers",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png"
  },
  {
    name: "EARPHONES",
    slug: "earphones",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png"
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 my-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-16 sm:gap-8">
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group bg-gray-100 rounded-lg text-center hover:shadow-lg transition-shadow relative h-48"
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-40 h-40">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="pt-24">
                <h3 className="text-lg font-bold mb-4">{category.name}</h3>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-orange-500 transition-colors">
                  <span className="text-sm font-semibold mr-2">SHOP</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
