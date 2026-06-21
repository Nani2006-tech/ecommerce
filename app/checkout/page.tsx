'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.email && formData.street && formData.city && formData.state && formData.zip) {
      setStep('payment')
    }
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setStep('confirmation')
    clearCart()
  }

  const taxAmount = total * 0.08
  const finalTotal = total * 1.08

  if (step === 'confirmation') {
    return (
      <main className="min-h-screen bg-background">
        <Header cartCount={0} />
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <div className="mb-4 text-4xl">✓</div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="mt-6 space-y-2">
              <p><span className="font-semibold">Order Number:</span> #ORD-{Date.now()}</p>
              <p><span className="font-semibold">Email:</span> {formData.email}</p>
              <p className="text-muted-foreground">You&apos;ll receive a confirmation email shortly.</p>
            </div>
            <Link href="/">
              <Button className="mt-8">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartCount} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8 flex gap-4">
              <div className={`flex items-center gap-2 ${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current">1</div>
                Shipping
              </div>
              <div className={`flex items-center gap-2 ${step === 'payment' || step === 'confirmation' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current">2</div>
                Payment
              </div>
              <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current">3</div>
                Confirmation
              </div>
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <form onSubmit={handleSubmitShipping} className="space-y-6 rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-bold">Shipping Information</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <Input
                  placeholder="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <Input
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />

                <Button type="submit" className="w-full" size="lg">
                  Continue to Payment
                </Button>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form onSubmit={handleSubmitPayment} className="space-y-6 rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-bold">Payment Information</h2>

                <Input
                  placeholder="Full Name"
                  name="cardName"
                  required
                />

                <Input
                  placeholder="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  required
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="MM/YY"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    required
                  />
                  <Input
                    placeholder="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={4}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep('shipping')}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isProcessing}
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border border-border bg-card p-6 h-fit sticky top-20">
            <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

            <div className="mb-6 space-y-4 border-b border-border pb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-muted">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
