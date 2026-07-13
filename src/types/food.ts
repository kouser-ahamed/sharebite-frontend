export interface Food {
  _id: string;
  foodName: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  ownerName: string;
  imageUrl: string;
  expiryDate: string;
  preparationDate: string | null;
  servingSize: string;
  contactNumber: string;
  isHalal: boolean;
  userId: string;
  userEmail: string;
  status: string;
  views: number;
  requests: number;
  createdAt: string;
  updatedAt: string;
}

export interface FoodsPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FoodFilterOptions {
  categories: string[];
  locations: string[];
}

export interface FoodsApiResponse {
  success: boolean;
  message: string;
  data: Food[];
  pagination: FoodsPagination;
  filterOptions: FoodFilterOptions;
  appliedFilters?: {
    search: string;
    category: string;
    location: string;
    expiryDate: string;
    sort: string;
  };
}