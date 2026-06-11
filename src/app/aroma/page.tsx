import type { Metadata } from "next";
import SubBrandPage from "@/components/SubBrandPage";

export const metadata: Metadata = {
  title: "NightFury Aroma, Premium Car Perfumes | Smell the Difference",
  description:
    "Premium hanging-bottle and spray car perfumes. Long-lasting fragrance engineered for every drive.",
};

export default function AromaPage() {
  return <SubBrandPage slug="aroma" />;
}
