import { z } from "zod";

export type BusinessTypeValue = "Food & Desserts" | "Clothing" | "Electronics" | "Services" | "Other";

const BUSINESS_TYPE_VALUES: BusinessTypeValue[] = [
  "Food & Desserts",
  "Clothing",
  "Electronics",
  "Services",
  "Other",
];

const BUSINESS_TYPE_KEYS: Record<BusinessTypeValue, string> = {
  "Food & Desserts": "food",
  Clothing: "clothing",
  Electronics: "electronics",
  Services: "services",
  Other: "other",
};

const EMOJIS: Record<BusinessTypeValue, string> = {
  "Food & Desserts": "🍰",
  Clothing: "👗",
  Electronics: "📱",
  Services: "✂️",
  Other: "🛍️",
};

const ICONS: Record<BusinessTypeValue, string> = {
  "Food & Desserts": "Cake",
  Clothing: "Shirt",
  Electronics: "Smartphone",
  Services: "Scissors",
  Other: "Package",
};

export interface BusinessTypeOption {
  value: BusinessTypeValue;
  label: string;
  emoji: string;
  icon: string;
  defaultProduct: string;
  defaultPrice: number;
  defaultBusinessName: string;
  defaultMaskedName: string;
  categoryTag: string;
}

export function getBusinessTypeOptions(
  t: (key: string) => string,
  get: <T>(key: string) => T | undefined
): BusinessTypeOption[] {
  return BUSINESS_TYPE_VALUES.map((value) => {
    const key = BUSINESS_TYPE_KEYS[value];
    const defaults = get(`businessTypes.defaults.${key}`) as { product: string; business: string; masked: string; category: string } | undefined;
    return {
      value,
      label: t(`businessTypes.${key}`),
      emoji: EMOJIS[value],
      icon: ICONS[value],
      defaultProduct: defaults?.product ?? "",
      defaultPrice: value === "Clothing" ? 450 : value === "Services" ? 500 : value === "Other" ? 200 : value === "Electronics" ? 150 : 300,
      defaultBusinessName: defaults?.business ?? "",
      defaultMaskedName: defaults?.masked ?? "",
      categoryTag: defaults?.category ?? "",
    };
  });
}

/** Step 1: Live Demo — all optional with defaults */
export function createStep1Schema(t: (key: string) => string) {
  return z.object({
    businessType: z
      .enum(["Food & Desserts", "Clothing", "Electronics", "Services", "Other"], {
        required_error: t("onboard.validation.businessType"),
      })
      .optional(),
    productName: z.string().max(100).optional(),
    price: z.number().positive().optional(),
    businessName: z.string().max(100).optional(),
    instapayNumber: z.string().optional(),
    maskedFullName: z.string().optional(),
  });
}

/** Step 2: Minimal Business Info */
export function createStep2Schema(t: (key: string) => string) {
  return z.object({
    businessName: z
      .string()
      .min(2, t("onboard.validation.businessNameMin"))
      .max(100, t("onboard.validation.businessNameMax")),
    instapayNumber: z.string().min(1, t("onboard.validation.instapayRequired")),
    maskedFullName: z
      .string()
      .min(1, t("onboard.validation.maskedNameRequired"))
      .refine((val) => val.includes("*"), {
        message: t("onboard.validation.maskedNameAsterisk"),
      }),
    whatsappNumber: z
      .string()
      .refine(
        (val) => /^01[0-9]{9}$/.test(val) || /^1[0-5][0-9]{8}$/.test(val),
        { message: t("onboard.validation.whatsappValid") }
      ),
  });
}

/** Step 3: Account registration — handled by Firebase */
export const step3Schema = z.object({});

export type Step1Data = {
  businessType: BusinessTypeValue;
  productName: string;
  price: number;
  businessName?: string;
  instapayNumber?: string;
  maskedFullName?: string;
};
export type Step2Data = z.infer<ReturnType<typeof createStep2Schema>>;
export type Step3Data = z.infer<typeof step3Schema>;

export type FullFormData = Step1Data & Step2Data;
