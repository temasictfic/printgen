export interface MugTs { }

export interface Root {
    data: Data
    extra: any[]
  }
  
  export interface Data {
    id: number
    type: string
    name: string
    brand: any
    model: string
    image: string
    variant_count: number
    is_discontinued: boolean
    description: string
    sizes: string[]
    colors: any[]
    techniques: Technique[]
    placements: Placement[]
    product_options: any[]
    _links: Links
  }
  
  export interface Technique {
    key: string
    display_name: string
    is_default: boolean
  }
  
  export interface Placement {
    placement: string
    technique: string
    layers: Layer[]
    placement_options: any[]
  }
  
  export interface Layer {
    type: string
    layer_options: any[]
  }
  
  export interface Links {
    self: Self
    variants: Variants
    categories: Categories
    product_prices: ProductPrices
    product_sizes: ProductSizes
    product_images: ProductImages
    product_availability: ProductAvailability
  }
  
  export interface Self {
    href: string
  }
  
  export interface Variants {
    href: string
  }
  
  export interface Categories {
    href: string
  }
  
  export interface ProductPrices {
    href: string
  }
  
  export interface ProductSizes {
    href: string
  }
  
  export interface ProductImages {
    href: string
  }
  
  export interface ProductAvailability {
    href: string
  }
  
