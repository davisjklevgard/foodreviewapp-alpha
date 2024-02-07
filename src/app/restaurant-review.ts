export interface RestaurantReview {
  [key: string]: any;
  // id: number;
  priceScore: number;
  serviceScore: number;
  locationScore: number;
  atmosphereScore: number;
  cleanlinessScore: number;
  availabilityScore: number;
  accessibilityScore: number;
  overallScore: number;
  comments: string;
  restaurantId: number;
}
