interface Params {
  id: string;
}

interface SearchParams {
  name: string;
  image: string;
  unit_amount: number | null;
  id: string;
  description: string;
  features: string;
  quantity: number;
}

export interface SearchParamTypes {
  params: Params;
  searchParams: SearchParams;
}
