interface ImagesEdge {
  node: {
    alt: string;
    url: string;
    src: string;
  };
}

interface CollectionEdge {
  node: {
    title: string;
    id: string;
  };
}

interface OptionsEdge {
  name: string;
  values: string[];
}

interface VariantPrice {
  amount: string;
  currencyCode: string;
}

interface VariantEdge {
  node: {
    id: string;
    price: VariantPrice;
    compareAtPrice: VariantPrice;
  };
}

export interface Product {
  id: string;
  title: string;
  vendor: string;
  totalInventory: number;
  availableForSale: boolean;
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
  category: {
    id: string;
    name: string;
  };
}
