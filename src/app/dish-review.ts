export interface DishReview {
  [key: string]: any;
  //id: number;
  bitter: number;
  doneness: number;
  overall: number;
  presentation: number;
  value: number;
  salty: number;
  savory: number;
  sour: number;
  sweet: number;
  temperature: number;
  dishId: number;
  comment: String;
}
