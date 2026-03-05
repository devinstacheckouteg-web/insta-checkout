import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard — InstaPay Checkout | لوحة التحكم",
  description: "Your dashboard — coming soon. لوحة التحكم الخاصة بك — قريباً",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardContent />
    </main>
  );
}
