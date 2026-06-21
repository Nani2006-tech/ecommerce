'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

interface ProductDetailProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  const { items, addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setQuantity(1)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartCount} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
            <div className="relative aspect-square w-full max-w-md">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {product.category}
              </p>
              <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="text-lg font-semibold">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">(120 reviews)</span>
              </div>

              <div className="mt-6 rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Product Description</p>
                <p className="mt-2 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Availability</p>
                  <p className="mt-1 text-lg font-semibold">
                    {product.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-destructive">Out of Stock</span>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Shipping</p>
                  <p className="mt-1 text-lg">Free shipping on orders over $50</p>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="mt-8 space-y-4 rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-muted-foreground">Price</span>
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-lg border border-border hover:bg-muted"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-lg border border-border hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-6 text-lg"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button variant="outline" className="w-full" size="lg">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold">{relatedProduct.name}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-primary">${relatedProduct.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="text-sm">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
