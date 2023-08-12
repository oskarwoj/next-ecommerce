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
}

export interface SearchParamTypes {
  params: Params;
  searchParams: SearchParams;
}
