export interface ImagesEdge {
  node: {
    alt: string;
    url: string;
    src: string;
  };
}

export interface CollectionEdge {
  node: {
    title: string;
    id: string;
  };
}

export interface OptionsEdge {
  name: string;
  values: string[];
}

export interface VariantPrice {
  amount: string;
  currencyCode: string;
}

export interface VariantEdge {
  node: {
    price: VariantPrice;
    priceV2: VariantPrice;
  };
}

export interface Product {
  id: string;
  title: string;
  vendor: string;
  totalInventory: number;
  options: OptionsEdge[];
  images: {
    edges: ImagesEdge[];
  };
  collections: {
    edges: CollectionEdge[];
  };
  variants: {
    edges: VariantEdge[];
  };
}
