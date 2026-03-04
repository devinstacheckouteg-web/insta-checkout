"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPES, type BusinessType } from "./smart-defaults";

interface BusinessTypePillsProps {
  selected: BusinessType | null;
  onSelect: (type: BusinessType) => void;
}

export function BusinessTypePills({ selected, onSelect }: BusinessTypePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {BUSINESS_TYPES.map((type) => {
        const isSelected = selected === type.value;
        return (
          <motion.button
            key={type.value}
            type="button"
            whileTap={{ scale: 0.95 }}
            animate={isSelected ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 0.2 }}
            onClick={() => onSelect(type.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 min-h-[44px]",
              isSelected
                ? "bg-[#0D9488] text-white shadow-md shadow-[#0D9488]/20"
                : "bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#0D9488]/40 hover:bg-[#0D9488]/5"
            )}
          >
            <span>{type.emoji}</span>
            <span>{type.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
