"use client";

import type React from "react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, CreditCard, Truck } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: string;
  eMoneyNumber: string;
  eMoneyPin: string;
}

interface FormErrors {
  [key: string]: string;
}

interface OrderSummary {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-money",
    eMoneyNumber: "",
    eMoneyPin: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const total = subtotal + shipping + vat;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Billing Details Validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (
      !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-$$$$]/g, ""))
    )
      newErrors.phone = "Please enter a valid phone number";

    // Shipping Info Validation
    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 5)
      newErrors.address = "Please enter a complete address";

    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP Code is required";
    else if (!/^[0-9]{5}(-[0-9]{4})?$/.test(formData.zipCode))
      newErrors.zipCode = "Please enter a valid ZIP code";

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    // Payment Method Validation
    if (formData.paymentMethod === "e-money") {
      if (!formData.eMoneyNumber.trim())
        newErrors.eMoneyNumber = "e-Money Number is required";
      else if (!/^[0-9]{9}$/.test(formData.eMoneyNumber))
        newErrors.eMoneyNumber = "e-Money Number must be 9 digits";

      if (!formData.eMoneyPin.trim())
        newErrors.eMoneyPin = "e-Money PIN is required";
      else if (!/^[0-9]{4}$/.test(formData.eMoneyPin))
        newErrors.eMoneyPin = "e-Money PIN must be 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = (): string => {
    return `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || state.items.length === 0) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderNumber = generateOrderNumber();
    const summary: OrderSummary = {
      orderNumber,
      items: state.items,
      subtotal,
      shipping,
      vat,
      total,
      customerInfo: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod:
        formData.paymentMethod === "e-money" ? "e-Money" : "Cash on Delivery"
    };

    setOrderSummary(summary);
    setIsProcessing(false);
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowConfirmation(false);
    router.push("/");
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart before checking out.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-orange-500 hover:bg-orange-600 rounded-none"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 text-gray-600 hover:text-black"
        >
          Go Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-8">CHECKOUT</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Billing Details */}
              <div>
                <h2 className="text-orange-500 font-semibold text-sm tracking-wide mb-4">
                  BILLING DETAILS
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900"
                    >
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`mt-1 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                      placeholder="Alexei Ward"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`mt-1 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                      placeholder="alexei@mail.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-1">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-900"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={e =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`mt-1 ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                      placeholder="+1 202-555-0136"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h2 className="text-orange-500 font-semibold text-sm tracking-wide mb-4">
                  SHIPPING INFO
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-900"
                    >
                      Your Address *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={e =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className={`mt-1 ${
                        errors.address
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                      placeholder="1137 Williams Avenue"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="zipCode"
                        className="text-sm font-medium text-gray-900"
                      >
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={e =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                        className={`mt-1 ${
                          errors.zipCode
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-orange-500"
                        }`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="city"
                        className="text-sm font-medium text-gray-900"
                      >
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={e =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className={`mt-1 ${
                          errors.city
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-orange-500"
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-900"
                    >
                      Country *
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={e =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className={`mt-1 ${
                        errors.country
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                      placeholder="United States"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h2 className="text-orange-500 font-semibold text-sm tracking-wide mb-4">
                  PAYMENT DETAILS
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-900 mb-3 block">
                      Payment Method
                    </Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={value =>
                        setFormData({ ...formData, paymentMethod: value })
                      }
                      className="space-y-3"
                    >
                      <div
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.paymentMethod === "e-money"
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <RadioGroupItem value="e-money" id="e-money" />
                        <Label
                          htmlFor="e-money"
                          className="flex items-center cursor-pointer"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          e-Money
                        </Label>
                      </div>
                      <div
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.paymentMethod === "cash"
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <RadioGroupItem value="cash" id="cash" />
                        <Label
                          htmlFor="cash"
                          className="flex items-center cursor-pointer"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.paymentMethod === "e-money" && (
                    <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label
                          htmlFor="eMoneyNumber"
                          className="text-sm font-medium text-gray-900"
                        >
                          e-Money Number *
                        </Label>
                        <Input
                          id="eMoneyNumber"
                          value={formData.eMoneyNumber}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              eMoneyNumber: e.target.value
                            })
                          }
                          className={`mt-1 ${
                            errors.eMoneyNumber
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-orange-500"
                          }`}
                          placeholder="238521993"
                          maxLength={9}
                        />
                        {errors.eMoneyNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.eMoneyNumber}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="eMoneyPin"
                          className="text-sm font-medium text-gray-900"
                        >
                          e-Money PIN *
                        </Label>
                        <Input
                          id="eMoneyPin"
                          type="password"
                          value={formData.eMoneyPin}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              eMoneyPin: e.target.value
                            })
                          }
                          className={`mt-1 ${
                            errors.eMoneyPin
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-orange-500"
                          }`}
                          placeholder="6891"
                          maxLength={4}
                        />
                        {errors.eMoneyPin && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.eMoneyPin}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "cash" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        The 'Cash on Delivery' option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-lg p-8 h-fit">
            <h2 className="text-lg font-semibold mb-6">SUMMARY</h2>

            <div className="space-y-6 mb-6">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={item.image.desktop}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-gray-600 text-sm font-semibold">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">TOTAL</span>
                <span className="font-semibold">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SHIPPING</span>
                <span className="font-semibold">${shipping}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT (INCLUDED)</span>
                <span className="font-semibold">${vat.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>GRAND TOTAL</span>
                <span className="text-orange-500">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 rounded-none"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "CONTINUE & PAY"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Order Confirmation Modal */}
      {showConfirmation && orderSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-8 text-center border-b">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                THANK YOU FOR YOUR ORDER
              </h2>
              <p className="text-gray-600">
                You will receive an email confirmation shortly.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Order #{orderSummary.orderNumber}
              </p>
            </div>

            {/* Order Summary */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Items Summary */}
                <div>
                  <h3 className="font-semibold mb-4">ORDER SUMMARY</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-4">
                      {orderSummary.items.slice(0, 2).map(item => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3"
                        >
                          <Image
                            src={item.image.desktop}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">
                              {item.name}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                          <span className="text-gray-600 text-sm">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                      {orderSummary.items.length > 2 && (
                        <div className="text-center py-2 border-t">
                          <p className="text-gray-600 text-sm">
                            and {orderSummary.items.length - 2} other item(s)
                          </p>
                        </div>
                      )}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${orderSummary.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span>${orderSummary.shipping}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">VAT</span>
                        <span>${orderSummary.vat.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>GRAND TOTAL</span>
                        <span className="text-orange-500">
                          ${orderSummary.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping & Payment Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">SHIPPING ADDRESS</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">
                        {orderSummary.customerInfo.name}
                      </p>
                      <p>{orderSummary.customerInfo.address}</p>
                      <p>
                        {orderSummary.customerInfo.city},{" "}
                        {orderSummary.customerInfo.zipCode}
                      </p>
                      <p>{orderSummary.customerInfo.country}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">PAYMENT METHOD</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      {orderSummary.paymentMethod === "e-Money" ? (
                        <CreditCard className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Truck className="h-4 w-4 text-gray-600" />
                      )}
                      <span>{orderSummary.paymentMethod}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">CONTACT INFO</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{orderSummary.customerInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t bg-gray-50">
              <Button
                onClick={handleConfirmOrder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                BACK TO HOME
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
