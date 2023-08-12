export interface ProductType {
  name: string;
  unit_amount: number | null;
  quantity?: number;
  image: string;
  id: string;
  description: string | null;
  metadata: MetadataType;
}

interface MetadataType {
  features: string;
}
