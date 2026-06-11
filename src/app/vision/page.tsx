import type { Metadata } from "next";
import SubBrandPage from "@/components/SubBrandPage";

export const metadata: Metadata = {
  title: "NightFury Vision, LED Headlights | Drive the Difference",
  description:
    "Premium 2-wheeler and 4-wheeler LED headlights. 250% brightness, CANBUS integration, 18-month warranty.",
};

export default function VisionPage() {
  return <SubBrandPage slug="vision" />;
}
