export type FoodRequestStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface FoodRequestItem {
  _id: string;

  foodId: string;
  foodName: string;
  foodImageUrl: string;
  foodCategory: string;
  foodExpiryDate: string;
  foodShortDescription: string;
  foodLocation: string;
  foodIsHalal: boolean;
  foodOwnerContactNumber: string;
  foodStatus: string;

  foodOwnerId: string;
  foodOwnerName: string;
  foodOwnerEmail: string;

  requesterUserId: string;
  requesterName: string;
  requesterEmail: string;

  phoneNumber: string;
  address: string;
  requestDescription: string;
  neededDate: string;

  status: FoodRequestStatus;

  ownerPickupLocation: string | null;
  ownerContactNumber: string | null;
  ownerMessage: string | null;
  rejectionReason: string | null;
  decisionDate: string | null;

  requestDate: string;
  updatedAt: string;
}

export interface FoodRequestStatusCounts {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface FoodRequestListResponse {
  success: boolean;
  message: string;
  data: FoodRequestItem[];
  statusCounts: FoodRequestStatusCounts;
  error?: string;
}

export interface FoodRequestActionResponse {
  success: boolean;
  message: string;
  data?: FoodRequestItem | null;
  deletedCount?: number;
  error?: string;
}