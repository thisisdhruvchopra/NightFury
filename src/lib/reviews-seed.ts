export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajat Verma",
    role: "Fortuner owner · Delhi NCR",
    quote:
      "Swapped my stock halogens for the NightFury 4W pair and the highway drive home felt like a different car. Zero flicker, zero dash errors. This is OEM-plus quality.",
    rating: 5,
  },
  {
    name: "Mehul Shah",
    role: "Accessories retailer · Ahmedabad",
    quote:
      "I stock a lot of brands. NightFury is the only one where customers come back asking for the same box by name. The packaging sells itself off the shelf.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    role: "Swift owner · Bengaluru",
    quote:
      "The Midnight Noir spray is genuinely premium, my cab-driver friends keep asking what it is. One bottle has lasted me three months and counting.",
    rating: 5,
  },
];
