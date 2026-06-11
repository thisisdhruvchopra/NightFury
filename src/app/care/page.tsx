import type { Metadata } from "next";
import SubBrandPage from "@/components/SubBrandPage";

export const metadata: Metadata = {
  title: "NightFury Care, Car Care Essentials | Feel the Difference",
  description:
    "Detailing-grade microfiber cloths and pH-balanced car wet wipes. Professional care for daily drivers.",
};

export default function CarePage() {
  return <SubBrandPage slug="care" />;
}
