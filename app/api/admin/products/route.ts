import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/lib/types";

const dataFilePath = path.join(process.cwd(), "data/products.json");

// Helper function to read products
async function getProducts() {
  const data = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(data);
}

// Helper function to save products
async function saveProducts(products: Product[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), "utf8");
}

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const products = await getProducts();

    // Generate new ID
    const newId = Math.max(0, ...products.map((p: Product) => p.id)) + 1;
    const productWithId = { ...newProduct, id: newId };

    // Add to products array
    products.push(productWithId);
    await saveProducts(products);

    return NextResponse.json(productWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
