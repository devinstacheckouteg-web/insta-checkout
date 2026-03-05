"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "@/lib/locale-provider";
import { createStep1Schema, getBusinessTypeOptions, type Step1Data } from "./types";
import { CheckoutPreview } from "./checkout-preview";

interface StepOneProps {
  defaultValues: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
}

const FALLBACK_DEFAULTS: Step1Data = {
  businessType: "Food & Desserts",
  productName: "Chocolate cake",
  price: 300,
  businessName: "Sarah's Sweets",
  instapayNumber: "01XXXXXXXXX",
  maskedFullName: "S*** M*** A** M***",
};

export function StepOne({ defaultValues, onNext }: StepOneProps) {
  const { t, get } = useTranslations()
  const step1Schema = useMemo(() => createStep1Schema(t), [t])
  const BUSINESS_TYPE_OPTIONS = useMemo(() => getBusinessTypeOptions(t, get), [t, get])
  const mergedDefaults = { ...FALLBACK_DEFAULTS, ...defaultValues };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: mergedDefaults,
  });

  const businessType = watch("businessType") ?? FALLBACK_DEFAULTS.businessType;
  const productName = watch("productName") ?? FALLBACK_DEFAULTS.productName;
  const price = watch("price") ?? FALLBACK_DEFAULTS.price;
  const businessName = watch("businessName") ?? FALLBACK_DEFAULTS.businessName;
  const instapayNumber = watch("instapayNumber") ?? FALLBACK_DEFAULTS.instapayNumber;
  const maskedFullName = watch("maskedFullName") ?? FALLBACK_DEFAULTS.maskedFullName;

  const handleBusinessTypeSelect = (value: Step1Data["businessType"]) => {
    if (!value) return;
    const opt = BUSINESS_TYPE_OPTIONS.find((o) => o.value === value);
    if (opt) {
      setValue("businessType", value, { shouldValidate: false });
      setValue("productName", opt.defaultProduct, { shouldValidate: false });
      setValue("price", opt.defaultPrice, { shouldValidate: false });
      setValue("businessName", opt.defaultBusinessName, { shouldValidate: false });
      setValue("maskedFullName", opt.defaultMaskedName, { shouldValidate: false });
    }
  };

  const onSubmit = (data: Partial<Step1Data>) => {
    const payload: Step1Data = {
      businessType: data.businessType ?? FALLBACK_DEFAULTS.businessType,
      productName: data.productName ?? FALLBACK_DEFAULTS.productName,
      price: data.price ?? FALLBACK_DEFAULTS.price,
      businessName: data.businessName ?? FALLBACK_DEFAULTS.businessName,
      instapayNumber: data.instapayNumber ?? FALLBACK_DEFAULTS.instapayNumber,
      maskedFullName: data.maskedFullName ?? FALLBACK_DEFAULTS.maskedFullName,
    };
    onNext(payload);
  };

  const categoryTag = BUSINESS_TYPE_OPTIONS.find((o) => o.value === businessType)?.categoryTag;
  const demoPreview = (
    <CheckoutPreview
      businessName={businessName}
      productName={productName}
      price={price}
      instapayNumber={instapayNumber}
      maskedName={maskedFullName}
      businessType={businessType}
      categoryTag={categoryTag}
      inPhoneFrame
      disabled
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          {t("onboard.step1.title")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("onboard.step1.description")}
        </p>
      </motion.div>

      {/* Business type pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-2.5"
      >
        <Label className="text-muted-foreground">{t("onboard.step1.businessType")}</Label>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPE_OPTIONS.map((opt) => (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => handleBusinessTypeSelect(opt.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                businessType === opt.value
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground hover:shadow-sm"
              }`}
            >
              <span className="text-base">{opt.emoji}</span>
              <span>{opt.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Layout: mobile = [pills] [demo] [fields+button], desktop = [pills] [fields | demo] [button] */}
      <div className="flex flex-col sm:flex-row sm:gap-8 sm:items-start">
        {/* Mobile only: Demo above the continue button — this is what the customer will see */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="block sm:hidden w-full space-y-2"
        >
          <p className="text-xs font-medium text-muted-foreground text-center">
            {t("onboard.step1.demoLabel")}
          </p>
          {demoPreview}
        </motion.div>

        {/* Editable demo fields */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 space-y-4"
        >
          {/* You can edit the details below if you like */}
          <details className="group rounded-xl border border-border/60 bg-muted/30 overflow-hidden mt-6">
            <summary className="flex items-center justify-between gap-2 px-4 py-3 cursor-pointer list-none text-sm font-medium text-muted-foreground hover:text-foreground transition-colors [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                {t("onboard.step1.expandLabel")}
              </span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="space-y-1.5">
                  <Label htmlFor="demoBusinessName" className="text-xs text-muted-foreground">{t("onboard.step1.businessName")}</Label>
                  <Input id="demoBusinessName" className="h-10 text-sm bg-background" placeholder={t("onboard.step1.placeholders.businessName")} {...register("businessName")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demoProductName" className="text-xs text-muted-foreground">{t("onboard.step1.product")}</Label>
                  <Input id="demoProductName" className="h-10 text-sm bg-background" placeholder={t("onboard.step1.placeholders.product")} {...register("productName")} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="demoPrice" className="text-xs text-muted-foreground">{t("onboard.step1.price")}</Label>
                  <Input id="demoPrice" type="number" min={1} className="h-10 text-sm font-mono bg-background" dir="ltr" {...register("price", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demoInstapay" className="text-xs text-muted-foreground">{t("onboard.step1.instapayNumber")}</Label>
                  <Input id="demoInstapay" className="h-10 text-sm font-mono bg-background" dir="ltr" placeholder="01XXXXXXXXX" {...register("instapayNumber")} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demoMaskedName" className="text-xs text-muted-foreground">{t("onboard.step1.maskedName")}</Label>
                <Input id="demoMaskedName" className="h-10 text-sm bg-background" placeholder={t("onboard.step1.placeholders.maskedName")} {...register("maskedFullName")} />
              </div>
            </div>
          </details>
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.99]"
          >
            {t("onboard.step1.cta")}
          </Button>
        </motion.div>
        {/* Desktop: preview on the side — this is what the customer will see */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="hidden sm:block shrink-0 w-[280px] sticky top-4 space-y-2"
        >
          <p className="text-xs font-medium text-muted-foreground text-center">
            {t("onboard.step1.demoLabel")}
          </p>
          {demoPreview}
        </motion.div>
      </div>
    </form>
  );
}
