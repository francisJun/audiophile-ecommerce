'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '../[action]/[id]/page';

export default function NewProductPage() {
  const router = useRouter();

  // This component is just a wrapper that renders the ProductForm in "new" mode
  // We don't need any additional logic here since the form handles its own state
  
  return <ProductForm params={{ action: 'new' }} />;
}
