'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-9xl font-bold text-orange-500">500</h1>
        <h2 className="text-3xl font-bold text-gray-900">Something went wrong!</h2>
        <p className="text-gray-600">
          We're sorry, but an unexpected error has occurred. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            onClick={() => reset()}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Try again
          </Button>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
