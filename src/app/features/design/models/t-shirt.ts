export interface TShirt {
    data: Daum[]
    extra: any[]
    paging: Paging
    _links: Links
  }
  
  export interface Daum {
    catalog_variant_id: number
    color: string
    primary_hex_color: string
    secondary_hex_color: any
    images: Image[]
  }
  
  export interface Image {
    placement: string
    image_url: string
    background_color: string
    background_image: string
  }
  
  export interface Paging {
    total: number
    limit: number
    offset: number
  }
  
  export interface Links {
    self: Self
    product_details: ProductDetails
  }
  
  export interface Self {
    href: string
  }
  
  export interface ProductDetails {
    href: string
  }
  