"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  ChevronLeft,
  X,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import productsData from "@/data/products.json";

type GalleryImage = {
  src: string;
  alt: string;
};

const GalleryImage = ({
  src,
  alt,
  onClick
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => (
  <motion.div
    className="relative w-full h-full cursor-pointer group"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg z-10" />
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover rounded-lg"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="bg-white bg-opacity-80 p-2 rounded-full">
        <Plus className="h-6 w-6 text-gray-800" />
      </div>
    </div>
  </motion.div>
);

const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <button
      className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
      onClick={e => {
        e.stopPropagation();
        onClose();
      }}
    >
      <X className="h-8 w-8" />
    </button>

    <button
      className="absolute left-4 text-white hover:text-orange-500 transition-colors z-10"
      onClick={e => {
        e.stopPropagation();
        onPrev();
      }}
    >
      <ChevronLeftIcon className="h-12 w-12" />
    </button>

    <div
      className="relative w-full max-w-4xl h-full max-h-[80vh]"
      onClick={e => e.stopPropagation()}
    >
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full"
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>

    <button
      className="absolute right-4 text-white hover:text-orange-500 transition-colors z-10"
      onClick={e => {
        e.stopPropagation();
        onNext();
      }}
    >
      <ChevronRight className="h-12 w-12" />
    </button>

    <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
      {currentIndex + 1} / {images.length}
    </div>
  </motion.div>
);

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = product
    ? [
        {
          src: product.gallery.first.desktop,
          alt: `${product.name} gallery 1`
        },
        {
          src: product.gallery.second.desktop,
          alt: `${product.name} gallery 2`
        },
        { src: product.gallery.third.desktop, alt: `${product.name} gallery 3` }
      ]
    : [];

  useEffect(() => {
    const foundProduct = productsData.find(
      (p: Product) => p.slug === params.slug
    );
    setProduct(foundProduct || null);
  }, [params.slug]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button
          onClick={() => router.push("/")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Go Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: {
          mobile: product.image.mobile,
          tablet: product.image.tablet,
          desktop: product.image.desktop
        }
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-8 text-gray-600 hover:text-black flex items-center gap-2 rounded-none"
        >
          <ChevronLeft className="h-4 w-4" />
          Go Back
        </Button>

        <div className="bg-white rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Image
                src={product.image.desktop}
                alt={product.name}
                width={400}
                height={400}
                className="w-full rounded-lg"
              />
            </div>
            <div>
              {product.new && (
                <p className="text-orange-500 text-sm tracking-widest mb-4">
                  NEW PRODUCT
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-8">{product.description}</p>
              <p className="text-2xl font-bold mb-8">
                ${product.price.toLocaleString()}
              </p>

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2 bg-gray-100 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-200 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-200 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-none"
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">FEATURES</h2>
              <div className="text-gray-600 whitespace-pre-line">
                {product.features}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">IN THE BOX</h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="text-orange-500 font-semibold mr-4">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-600">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-16">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <GalleryImage
                  src={product.gallery.first.desktop}
                  alt={`${product.name} gallery 1`}
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setLightboxOpen(true);
                  }}
                />
              </div>
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <GalleryImage
                  src={product.gallery.second.desktop}
                  alt={`${product.name} gallery 2`}
                  onClick={() => {
                    setCurrentImageIndex(1);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden">
                <GalleryImage
                  src={product.gallery.third.desktop}
                  alt={`${product.name} gallery 3`}
                  onClick={() => {
                    setCurrentImageIndex(2);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {lightboxOpen && (
              <Lightbox
                images={galleryImages}
                currentIndex={currentImageIndex}
                onClose={() => setLightboxOpen(false)}
                onNext={() =>
                  setCurrentImageIndex(
                    prev => (prev + 1) % galleryImages.length
                  )
                }
                onPrev={() =>
                  setCurrentImageIndex(
                    prev =>
                      (prev - 1 + galleryImages.length) % galleryImages.length
                  )
                }
              />
            )}
          </AnimatePresence>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {product.others.map(item => (
                <div key={item.slug} className="text-center">
                  <Image
                    src={item.image.desktop}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full rounded-lg mb-6"
                  />
                  <h3 className="text-xl font-bold mb-4">{item.name}</h3>
                  <Link href={`/product/${item.slug}`}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      SEE PRODUCT
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
