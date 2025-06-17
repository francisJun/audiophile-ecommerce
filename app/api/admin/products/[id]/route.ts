import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data/products.json');

// Helper function to read products
async function getProducts() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

// Helper function to save products
async function saveProducts(products: Product[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const products = await getProducts();
    const product = products.find((p: Product) => p.id === parseInt(params.id));
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedProduct = await request.json();
    const products = await getProducts();
    const index = products.findIndex((p: Product) => p.id === parseInt(params.id));
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Preserve the ID
    products[index] = { ...products[index], ...updatedProduct, id: parseInt(params.id) };
    await saveProducts(products);
    
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const products = await getProducts();
    const index = products.findIndex((p: Product) => p.id === parseInt(params.id));
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const deletedProduct = products.splice(index, 1)[0];
    await saveProducts(products);
    
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
