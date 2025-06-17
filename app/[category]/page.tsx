"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import productsData from "@/data/products.json";
import CategoryGrid from "@/components/category-grid";

export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const categoryProducts = productsData.filter(
      (product: Product) => product.category === params.category
    );
    setProducts(categoryProducts);
  }, [params.category]);

  const categoryName =
    typeof params.category === "string"
      ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
      : "";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">{categoryName}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`grid md:grid-cols-2 gap-12 items-center bg-white rounded-lg p-8 ${
                index % 2 === 1 ? "md:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                <Image
                  src={product.image.desktop}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full rounded-lg"
                />
              </div>
              <div
                className={`text-center md:text-left ${
                  index % 2 === 1 ? "md:col-start-1" : ""
                }`}
              >
                {product.new && (
                  <p className="text-orange-500 text-sm tracking-widest mb-4">
                    NEW PRODUCT
                  </p>
                )}
                <h2 className="text-3xl font-bold mb-6">{product.name}</h2>
                <p className="text-gray-600 mb-8">{product.description}</p>
                <Link href={`/product/${product.slug}`}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-none">
                    SEE PRODUCT
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CategoryGrid />
    </div>
  );
}
