export type BusinessType =
  | "Food & Desserts"
  | "Clothing"
  | "Electronics"
  | "Services"
  | "Other";

export interface BusinessTypeOption {
  value: BusinessType;
  label: string;
  emoji: string;
  defaultProduct: string;
  defaultPrice: number;
}

export const BUSINESS_TYPES: BusinessTypeOption[] = [
  { value: "Food & Desserts", label: "أكل وحلويات", emoji: "🍰", defaultProduct: "شوكولاتة كيك", defaultPrice: 300 },
  { value: "Clothing", label: "ملابس", emoji: "👗", defaultProduct: "بنطلون جينز", defaultPrice: 450 },
  { value: "Electronics", label: "إلكترونيات", emoji: "📱", defaultProduct: "كفر موبايل", defaultPrice: 150 },
  { value: "Services", label: "خدمات", emoji: "✂️", defaultProduct: "جلسة تصوير", defaultPrice: 500 },
  { value: "Other", label: "أخرى", emoji: "🛍️", defaultProduct: "منتج تجريبي", defaultPrice: 200 },
];

export function getDefaults(type: BusinessType) {
  return BUSINESS_TYPES.find((t) => t.value === type)!;
}
