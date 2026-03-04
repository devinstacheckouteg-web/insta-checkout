"use client";

import { Cake, Shirt, Smartphone, Scissors, Package, Hash, ShieldCheck, ArrowLeftRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPE_OPTIONS } from "./types";

const ICON_MAP = {
  Cake,
  Shirt,
  Smartphone,
  Scissors,
  Package,
} as const;

type BusinessTypeValue = (typeof BUSINESS_TYPE_OPTIONS)[number]["value"];

interface CheckoutPreviewProps {
  businessName: string;
  productName: string;
  price: number;
  instapayNumber?: string;
  maskedName?: string;
  businessType?: BusinessTypeValue;
  categoryTag?: string;
  inPhoneFrame?: boolean;
  disabled?: boolean;
  size?: "full" | "thumbnail";
  className?: string;
}

export function CheckoutPreview({
  businessName,
  productName,
  price,
  instapayNumber = "01XXXXXXXXX",
  maskedName = "أ*** م*** أ** م***",
  businessType = "Food & Desserts",
  categoryTag,
  inPhoneFrame = true,
  disabled = true,
  size = "full",
  className,
}: CheckoutPreviewProps) {
  const iconName = businessType
    ? (BUSINESS_TYPE_OPTIONS.find((o) => o.value === businessType)?.icon ?? "Cake")
    : "Cake";
  const IconComponent = ICON_MAP[iconName] ?? Cake;

  // Match Checkout app layout: SellerHeader first, then Order Card, Payment Instructions, InstaPay, Verification, CTA
  const content = (
    <div className="flex flex-col gap-5 p-4 text-sm pb-6">
      {/* SellerHeader — matches checkout app, at top */}
      <header className="flex flex-col items-center gap-3 pb-4 border-b border-border">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-primary/10 text-primary">
          <IconComponent className="size-6" />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <h1 className="text-base font-bold text-foreground text-balance text-center">
            {businessName}
          </h1>
          {categoryTag && (
            <span className="text-xs text-muted-foreground">{categoryTag}</span>
          )}
        </div>
      </header>

      {/* Order Details Card — matches checkout step-one */}
      <Card className="overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-bold text-foreground text-base leading-tight">{productName}</h3>
            <p className="text-xs text-muted-foreground">طلب دفع</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0D9488]/10 text-[#0D9488] px-3 py-2 rounded-xl">
            <span className="text-xl font-bold">{price}</span>
            <span className="text-xs font-semibold">ج.م</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Instructions — matches checkout */}
      <Card className="shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="bg-accent px-4 py-2.5 border-b border-border">
          <p className="text-xs font-bold text-accent-foreground flex items-center gap-2">
            <Smartphone className="size-3.5" />
            طريقة الدفع عبر انستاباي
          </p>
        </div>
        <CardContent className="py-3">
          <ol className="flex flex-col gap-2 text-xs text-foreground">
            <li className="flex items-start gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[10px] font-bold shrink-0">1</span>
              <span>افتح تطبيق البنك أو المحفظة التي تدعم انستاباي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[10px] font-bold shrink-0">2</span>
              <span>ابدأ تحويل جديد</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#0D9488]/10 text-[#0D9488] shrink-0">
                <ArrowLeftRight className="size-2.5" />
              </span>
              <span>أدخل رقم الحساب أدناه</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* InstaPay Account — matches checkout */}
      <Card className="border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardContent className="py-3">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
            <Hash className="size-3.5" />
            رقم حساب انستاباي
          </label>
          <div className="rounded-xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] p-3">
            <span className="text-sm font-mono font-medium tracking-[1px] text-foreground" dir="ltr">
              {instapayNumber}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Verification — matches checkout */}
      <div className="bg-[#ECFDF5] border-s-[3px] border-[#10B981] rounded-lg p-3">
        <div className="flex items-start gap-2 mb-2">
          <ShieldCheck className="size-4 text-[#0D9488] shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-[#0D9488]">كيف تتأكد أنك ترسل للشخص الصحيح؟</p>
        </div>
        <p className="text-[11px] text-foreground leading-relaxed mb-2">
          بعد إدخال رقم الحساب، سيعرض لك انستاباي اسمًا مُقنّعًا للمستلم قبل تأكيد التحويل. يجب أن ترى:
        </p>
        <div className="bg-card rounded-xl p-3 border border-[#10B981]/20 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <span className="text-sm font-bold font-mono tracking-wider text-[#0D9488]" dir="ltr">
            {maskedName}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed mt-2">
          إذا تطابق الاسم، فأنت ترسل إلى الحساب الصحيح. تابع وأكّد التحويل!
        </p>
      </div>

      {/* CTA button — matches checkout */}
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "w-full h-11 rounded-xl text-sm font-bold transition-opacity",
          disabled
            ? "bg-primary/60 text-primary-foreground cursor-default"
            : "bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-lg"
        )}
      >
        لقد قمت بالدفع
      </button>
    </div>
  );

  if (inPhoneFrame) {
    const isThumbnail = size === "thumbnail";
    return (
      <div
        className={cn(
          "relative mx-auto rounded-[2rem] border-[3px] border-foreground/10 bg-card p-2 shadow-xl transition-all duration-300",
          isThumbnail ? "w-[180px]" : "w-[280px]",
          className
        )}
      >
        <div className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl bg-foreground/10",
          isThumbnail ? "h-4 w-16" : "h-6 w-24"
        )} />
        <div className={cn(
          "overflow-hidden rounded-[1.5rem] bg-secondary overflow-y-auto",
          isThumbnail ? "max-h-[340px] [&>div]:p-2 [&>div]:gap-2 [&>div]:text-[10px] [&>div]:pb-3" : "max-h-[520px]"
        )}>
          {content}
        </div>
      </div>
    );
  }

  return <div className={cn("rounded-xl border border-border bg-card", className)}>{content}</div>;
}
