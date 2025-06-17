export interface Product {
  id: number
  slug: string
  name: string
  image: {
    mobile: string
    tablet: string
    desktop: string
  }
  category: string
  categoryImage: {
    mobile: string
    tablet: string
    desktop: string
  }
  new: boolean
  price: number
  description: string
  features: string
  includes: Array<{
    quantity: number
    item: string
  }>
  gallery: {
    first: {
      mobile: string
      tablet: string
      desktop: string
    }
    second: {
      mobile: string
      tablet: string
      desktop: string
    }
    third: {
      mobile: string
      tablet: string
      desktop: string
    }
  }
  others: Array<{
    slug: string
    name: string
    image: {
      mobile: string
      tablet: string
      desktop: string
    }
  }>
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: {
    mobile: string
    tablet: string
    desktop: string
  }
}

export interface OrderSummary {
  items: CartItem[]
  subtotal: number
  shipping: number
  vat: number
  total: number
}
