"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeftToLine } from "lucide-react";
import { step2Schema, type Step2Data } from "./types";

interface StepTwoProps {
  defaultValues: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export function StepTwo({ defaultValues, onNext, onBack }: StepTwoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      businessName: "",
      instapayNumber: "",
      maskedFullName: "",
      whatsappNumber: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
      <div className="space-y-2">
        <Label htmlFor="businessName">اسم البيزنس *</Label>
        <Input
          id="businessName"
          placeholder="مثلاً: Sweet Bites"
          className="h-12 rounded-lg border-[1.5px] border-input focus-visible:ring-2 focus-visible:ring-ring"
          aria-describedby={errors.businessName ? "businessName-error" : undefined}
          {...register("businessName")}
        />
        {errors.businessName && (
          <p id="businessName-error" className="text-sm text-destructive">
            {errors.businessName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="instapayNumber">رقم حساب InstaPay *</Label>
        <Input
          id="instapayNumber"
          placeholder="الرقم اللي العميل هيحوّل عليه"
          className="h-12 rounded-lg border-[1.5px] border-input font-mono text-lg focus-visible:ring-2 focus-visible:ring-ring"
          dir="ltr"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          aria-describedby={errors.instapayNumber ? "instapayNumber-error" : undefined}
          {...register("instapayNumber")}
        />
        {errors.instapayNumber && (
          <p id="instapayNumber-error" className="text-sm text-destructive">
            {errors.instapayNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="maskedFullName">الاسم المقنّع *</Label>
        <Input
          id="maskedFullName"
          placeholder='مثلاً: أ*** م*** أ** م***'
          className="h-12 rounded-lg border-[1.5px] border-input focus-visible:ring-2 focus-visible:ring-ring"
          aria-describedby={errors.maskedFullName ? "maskedFullName-error" : undefined}
          {...register("maskedFullName")}
        />
        {errors.maskedFullName && (
          <p id="maskedFullName-error" className="text-sm text-destructive">
            {errors.maskedFullName.message}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-success/20 bg-success/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10">
            <Lock className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="font-bold text-foreground">ليه بنطلب الاسم المقنّع؟</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              لما العميل يحوّل على InstaPay، التطبيق بيظهرله اسم المستلم بشكل مقنّع قبل ما
              يأكد. إحنا بنعرض نفس الاسم ده في صفحة الدفع عشان العميل يتأكد إنه بيحوّل
              للشخص الصح.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsappNumber">رقم واتساب *</Label>
        <div className="flex items-center gap-2" dir="ltr">
          <span className="flex h-12 items-center rounded-lg border-[1.5px] border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
            +20
          </span>
          <Input
            id="whatsappNumber"
            placeholder="01XXXXXXXXX"
            className="h-12 flex-1 rounded-lg border-[1.5px] border-input focus-visible:ring-2 focus-visible:ring-ring"
            dir="ltr"
            aria-describedby={errors.whatsappNumber ? "whatsappNumber-error" : undefined}
            {...register("whatsappNumber")}
          />
        </div>
        {errors.whatsappNumber && (
          <p id="whatsappNumber-error" className="text-sm text-destructive">
            {errors.whatsappNumber.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 flex-1 rounded-xl text-base gap-2 hover:bg-muted/80"
        >
          <ArrowLeftToLine className="h-4 w-4" />
          رجوع
        </Button>
        <Button
          type="submit"
          className="h-12 flex-1 rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/20"
        >
          الخطوة الأخيرة — إنشاء الحساب
        </Button>
      </div>
      </motion.div>
    </form>
  );
}
