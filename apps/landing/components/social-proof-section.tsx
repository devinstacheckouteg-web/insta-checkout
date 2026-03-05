"use client"

import { motion } from "framer-motion"
import { Users, Link2, Clock } from "lucide-react"
import { useTranslations } from "@/lib/locale-provider"

const STAT_ICONS = [Users, Link2, Clock]

export function SocialProofSection() {
  const { t, get } = useTranslations()
  const testimonials = (get("landing.socialProof.testimonials") ?? []) as Array<{ initials: string; name: string; type: string; quote: string }>
  const stats = (get("landing.socialProof.stats") ?? []) as Array<{ value: string; label: string }>

  return (
    <section className="bg-secondary px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-semibold text-foreground text-balance md:text-[2.5rem] md:leading-tight"
        >
          {t("landing.socialProof.title")}
        </motion.h2>

        {/* Testimonials */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="min-w-[280px] rounded-xl bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:min-w-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.type}</p>
                </div>
              </div>
              <p className="mt-4 text-sm italic leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 rounded-xl bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        >
          {stats.map((stat, i) => {
            const StatIcon = STAT_ICONS[i];
            return (
            <div key={i} className="flex flex-col items-center text-center">
              <StatIcon className="mb-2 h-5 w-5 text-primary" />
              <span className="font-mono text-2xl font-bold text-primary lg:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-muted-foreground lg:text-sm">
                {stat.label}
              </span>
            </div>
          );
          })}
        </motion.div>
      </div>
    </section>
  )
}
