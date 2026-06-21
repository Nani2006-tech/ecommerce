export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed'
}
