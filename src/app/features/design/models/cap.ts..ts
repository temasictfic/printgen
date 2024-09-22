export interface CapTs { }

export interface Root {
    data: Data
    extra: any[]
  }
  
  export interface Data {
    id: number
    type: string
    name: string
    brand: string
    model: string
    image: string
    variant_count: number
    is_discontinued: boolean
    description: string
    sizes: string[]
    colors: Color[]
    techniques: Technique[]
    placements: Placement[]
    product_options: ProductOption[]
    _links: Links
  }
  
  export interface Color {
    name: string
    value: string
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
    placement_options: PlacementOption[]
  }
  
  export interface Layer {
    type: string
    layer_options: LayerOption[]
  }
  
  export interface LayerOption {
    name: string
    techniques: string[]
    type: string
    values: any
  }
  
  export interface PlacementOption {
    name: string
    techniques: string[]
    type: string
    values: boolean[]
  }
  
  export interface ProductOption {
    name: string
    techniques: string[]
    type: string
    values: string[]
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
  