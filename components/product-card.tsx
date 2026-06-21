'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'

export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-lg font-semibold text-white">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="mt-1 line-clamp-2 font-semibold text-card-foreground">
              {product.name}
            </h3>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault()
              onAddToCart(product)
            }}
            className="w-full"
            disabled={!product.inStock}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
