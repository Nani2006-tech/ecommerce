'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartCount} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
          <div className="text-center">
            <p className="text-2xl font-bold">Your cart is empty</p>
            <p className="mt-2 text-muted-foreground">Add items to get started</p>
            <Link href="/">
              <Button className="mt-6">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartCount} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-lg border border-border bg-card p-4"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold hover:text-primary">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-4 text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border border-border bg-card p-6 h-fit sticky top-20">
            <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

            <div className="space-y-4 border-b border-border pb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-b border-border pb-4">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${(total * 1.08).toFixed(2)}
              </span>
            </div>

            <Link href="/checkout">
              <Button className="mt-6 w-full py-6 text-lg" size="lg">
                Proceed to Checkout
              </Button>
            </Link>

            <Button variant="outline" className="mt-2 w-full">
              Continue Shopping
            </Button>

            <button
              onClick={() => clearCart()}
              className="mt-4 w-full text-center text-sm text-destructive hover:text-destructive/80"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
