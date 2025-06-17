import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-9xl font-bold text-orange-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
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
