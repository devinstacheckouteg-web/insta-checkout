"use client"

import { motion } from "framer-motion"
import {
  Link2,
  Palette,
  Bell,
  BarChart3,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react"
import { useTranslations } from "@/lib/locale-provider"

const FEATURE_ICONS = [Link2, Palette, Bell, BarChart3, ShoppingBag, ShieldCheck]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function FeaturesSection() {
  const { t, get } = useTranslations()
  const items = (get("landing.features.items") ?? []) as Array<{ title: string; description: string }>

  return (
    <section id="features" className="bg-card px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-semibold text-foreground text-balance md:text-[2.5rem] md:leading-tight"
        >
          {t("landing.features.title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
            <motion.div
              key={i}
              variants={cardVariants}
              className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          );
          })}
        </motion.div>
      </div>
    </section>
  )
}
