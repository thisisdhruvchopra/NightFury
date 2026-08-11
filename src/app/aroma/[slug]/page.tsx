import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubBrand, getProductByPageSlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  const brand = getSubBrand("aroma");
  return (brand?.products ?? [])
    .filter((p) => p.pageSlug)
    .map((p) => ({ slug: p.pageSlug as string }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByPageSlug("aroma", slug);
  if (!product) return { title: "Not Found | NightFury Aroma" };

  return {
    title: `${product.name}, ${product.variant} | NightFury Aroma`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NightFury Aroma`,
      description: product.tagline,
      type: "website",
    },
  };
}

export default async function AromaProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brand = getSubBrand("aroma");
  const product = getProductByPageSlug("aroma", slug);
  if (!brand || !product) notFound();

  return <ProductPage brand={brand} product={product} />;
}
