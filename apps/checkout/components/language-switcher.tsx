"use client";

import { useTranslations } from "@/lib/locale-provider";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, locales } = useTranslations();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1">
      <Globe className="h-4 w-4 text-muted-foreground ms-1" />
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {loc === "ar" ? "العربية" : "English"}
        </button>
      ))}
    </div>
  );
}
