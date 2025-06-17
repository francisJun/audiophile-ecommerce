"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  category: z.enum(["headphones", "speakers", "earphones"]),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  features: z.string().min(10, "Features must be at least 10 characters"),
  new: z.boolean().default(false)
  // Add other fields as needed
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm({
  params
}: {
  params: { action: string; id?: string };
}) {
  const isEdit = params.action === "edit";
  const productId = params.id ? parseInt(params.id) : null;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "headphones",
      price: 0,
      description: "",
      features: "",
      new: false
    }
  });

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEdit && productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/admin/products/${productId}`);
          if (!response.ok) throw new Error("Failed to fetch product");
          const product = await response.json();

          // Set form values
          Object.entries(product).forEach(([key, value]) => {
            if (key in productSchema.shape) {
              // Ensure the value matches the expected type for the field
              const formField = key as keyof ProductFormValues;
              // Only set the value if it matches the expected type
              if (
                typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean"
              ) {
                setValue(formField, value as string & number & boolean);
              } else if (value === null || value === undefined) {
                // Handle null/undefined values by setting to empty string or default
                setValue(formField, "" as any);
              }
            }
          });
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to load product"
          );
        }
      };

      fetchProduct();
    }
  }, [isEdit, productId, setValue]);

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const url =
        isEdit && productId
          ? `/api/admin/products/${productId}`
          : "/api/admin/products";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(
          isEdit ? "Failed to update product" : "Failed to create product"
        );
      }

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <Link
            href="/admin"
            className="flex items-center text-gray-600 hover:text-orange-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Basic Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug *
                  </label>
                  <Controller
                    name="slug"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors.slug ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    )}
                  />
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="headphones">Headphones</option>
                        <option value="speakers">Speakers</option>
                        <option value="earphones">Earphones</option>
                      </select>
                    )}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          onChange={e =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          className={`pl-8 w-full px-3 py-2 border rounded-md ${
                            errors.price ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      )}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <Controller
                    name="new"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        id="new"
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                      />
                    )}
                  />
                  <label
                    htmlFor="new"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Mark as new product
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Description</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description *
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features *
                  </label>
                  <Controller
                    name="features"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={8}
                        className={`w-full px-3 py-2 border rounded-md font-mono text-sm ${
                          errors.features ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter features separated by new lines"
                      />
                    )}
                  />
                  {errors.features && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.features.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Upload (Placeholder) */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500">
                  Image upload functionality will be implemented here
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  For now, please update images directly in the public/assets
                  directory
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <Link href="/admin">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isEdit ? "Update Product" : "Create Product"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
