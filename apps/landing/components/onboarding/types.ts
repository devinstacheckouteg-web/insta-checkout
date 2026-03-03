import { z } from "zod";

/** Step 1: Live Demo — all optional with defaults, no validation required */
export const step1Schema = z.object({
  businessType: z.enum(
    ["Food & Desserts", "Clothing", "Electronics", "Services", "Other"],
    { required_error: "اختار نوع البيزنس" }
  ).optional(),
  productName: z.string().max(100).optional(),
  price: z.number().positive().optional(),
  businessName: z.string().max(100).optional(),
  instapayNumber: z.string().optional(),
  maskedFullName: z.string().optional(),
});

/** Default demo values for Step 1 */
export const STEP1_DEFAULTS = {
  businessType: "Food & Desserts" as const,
  productName: "شوكولاتة كيك",
  price: 300,
  businessName: "حلويات سارة",
  instapayNumber: "01XXXXXXXXX",
  maskedFullName: "س*** م*** أ** م***",
};

/** Step 2: Minimal Business Info — only essential fields */
export const step2Schema = z.object({
  businessName: z
    .string()
    .min(2, "اسم البيزنس لازم يكون على الأقل حرفين")
    .max(100, "اسم البيزنس لازم يكون أقل من ١٠٠ حرف"),
  instapayNumber: z
    .string()
    .min(1, "رقم حساب InstaPay مطلوب"),
  maskedFullName: z
    .string()
    .min(1, "الاسم المقنّع مطلوب")
    .refine((val) => val.includes("*"), {
      message: "الاسم المقنّع لازم يحتوي على * واحدة على الأقل",
    }),
  whatsappNumber: z
    .string()
    .refine(
      (val) => /^01[0-9]{9}$/.test(val) || /^1[0-5][0-9]{8}$/.test(val),
      { message: "رقم واتساب مصري صالح — مثلاً 01XXXXXXXXX أو 10XXXXXXXX" }
    ),
});

/** Step 3: Account registration — handled by Firebase, no form schema */
export const step3Schema = z.object({});

/** Business type options with emojis, icons, and smart defaults */
export const BUSINESS_TYPE_OPTIONS = [
  { value: "Food & Desserts" as const, label: "أكل وحلويات", emoji: "🍰", icon: "Cake", defaultProduct: "شوكولاتة كيك", defaultPrice: 300, defaultBusinessName: "حلويات سارة", defaultMaskedName: "س*** م*** أ** م***", categoryTag: "حلويات ومخبوزات" },
  { value: "Clothing" as const, label: "ملابس", emoji: "👗", icon: "Shirt", defaultProduct: "بنطلون جينز", defaultPrice: 450, defaultBusinessName: "بوتيك ناديا", defaultMaskedName: "ن*** أ*** د** ي***", categoryTag: "ملابس وإكسسوارات" },
  { value: "Electronics" as const, label: "إلكترونيات", emoji: "📱", icon: "Smartphone", defaultProduct: "كفر موبايل", defaultPrice: 150, defaultBusinessName: "تيك ستور", defaultMaskedName: "أ*** ح*** م** د***", categoryTag: "إلكترونيات" },
  { value: "Services" as const, label: "خدمات", emoji: "✂️", icon: "Scissors", defaultProduct: "جلسة تصوير", defaultPrice: 500, defaultBusinessName: "ستوديو نور", defaultMaskedName: "ن*** و*** ر**", categoryTag: "خدمات" },
  { value: "Other" as const, label: "أخرى", emoji: "🛍️", icon: "Package", defaultProduct: "منتج تجريبي", defaultPrice: 200, defaultBusinessName: "متجر تجريبي", defaultMaskedName: "أ*** م*** أ** م***", categoryTag: "أخرى" },
] as const;

export type Step1Data = {
  businessType: "Food & Desserts" | "Clothing" | "Electronics" | "Services" | "Other";
  productName: string;
  price: number;
  businessName?: string;
  instapayNumber?: string;
  maskedFullName?: string;
};
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

export type FullFormData = Step1Data & Step2Data;

export const categoryOptions = [
  { value: "Food & Desserts", label: "أكل وحلويات" },
  { value: "Clothing", label: "ملابس" },
  { value: "Services", label: "خدمات" },
  { value: "Electronics", label: "إلكترونيات" },
  { value: "Other", label: "أخرى" },
] as const;
